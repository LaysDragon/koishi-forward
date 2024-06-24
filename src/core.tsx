import { Context, h, sleep, Keys, Universal, isNullable, Session } from 'koishi'
import { MessageParse } from './parse'
import { RuleSource, RuleTarget, Config } from './config'
import { icons } from './icons'

declare module 'koishi' {
    interface Tables {
        myrtus_forward_sent: Sent
    }
}

interface Sent {
    from: string
    to: string
    from_sid: string
    to_sid: string
    from_channel_id: string
    to_channel_id: string
    time: Date
    id?: number
}

// function isQQ(session: Session) {
//     return session.event.user?.avatar?.startsWith('http://q.qlogo.cn');
// }

export function apply(ctx: Context, config: Config) {
    ctx.model.extend('myrtus_forward_sent', {
        id: 'unsigned',
        time: 'timestamp',
        from: 'string(64)',
        to: 'string(64)',
        from_sid: 'string(64)',
        to_sid: 'string(64)',
        from_channel_id: 'string(64)',
        to_channel_id: 'string(64)',
    }, {
        autoInc: true
    })

    const logger = ctx.logger('forward')

    for (const rule of config.rules) {
        const sConfig = config.constants[rule.source] as RuleSource
        if (!sConfig) continue
        const targetConfigs: Array<RuleTarget> = []
        for (const target of rule.targets) {
            const targetConfig = config.constants[target] as RuleTarget
            if (targetConfig && !targetConfig.disabled) {
                targetConfigs.push(targetConfig)
            }
        }
        if (targetConfigs.length === 0) {
            continue
        }

        let listened = ctx.platform(sConfig.platform)
        if (sConfig.selfId !== '*') listened = listened.self(sConfig.selfId)
        if (sConfig.channelId !== '*') listened = listened.channel(sConfig.channelId)

        listened.on('message-created', async (session) => {
            const { event, sid } = session

            for (const regexpStr of sConfig.blockingWords) {
                const hit = event.message.elements.some(value => {
                    if (value.type === 'text') {
                        return new RegExp(regexpStr).test(value.attrs.content)
                    }
                    return false
                })

                if (hit) return
            }

            let rows: Pick<Sent, Keys<Sent>>[] = []
            const { quote } = event.message
            if (quote) {
                if (event.selfId === quote.user.id) {
                    rows = await ctx.database.get('myrtus_forward_sent', {
                        to: quote.id,
                        to_sid: sid,
                        to_channel_id: event.channel.id
                    })
                } else {
                    rows = await ctx.database.get('myrtus_forward_sent', {
                        from: quote.id,
                        from_sid: sid,
                        from_channel_id: event.channel.id
                    })
                }
                logger.debug('%C', '=== inspect quote ===')
                logger.debug(`from sid: ${sid}`)
                logger.debug(rows)
            }

            // qq one bot 有重複事件
            if (session.platform === 'onebot' && session.subsubtype === 'guild-file-added') {
                return;
            }

            const filtered: h[] = await new MessageParse(event.message.elements, listened, session, sConfig).recordAsText().output()


            const sent: Sent[] = []
            for (let index = 0; index < targetConfigs.length; index++) {
                const target = targetConfigs[index]
                const targetSid = `${target.platform}:${target.selfId}`
                const bot = ctx.bots[targetSid]

                const name = session.event?.member?.nick || session.event.user.nick || session.author.name;
                const icon = icons[session.platform];

                let prefix: h

                if (target.simulateOriginal && target.platform === 'discord') {
                    let avatar = event.user.avatar
                    if (event.platform === 'telegram') {
                        avatar = 'https://discord.com/assets/5d6a5e9d7d77ac29116e.png'
                    }
                    prefix = <author
                        name={`${icon}${name}`}
                        avatar={avatar}
                    />
                } else {
                    prefix = <>{icon} <b>{`${name}`}</b>:<br /></>
                }
                let payload: h = <message>{prefix}{...filtered}</message>

                if (!bot) {
                    logger.warn(`暂时找不到机器人实例 %c, 等待一会儿说不定就有了呢!`, targetSid)
                    continue
                }
                if (bot.status !== Universal.Status.ONLINE) {
                    logger.warn(`机器人实例 %c 处于非在线状态，可能与网络环境有关。`, targetSid)
                    continue
                }

                const delay = config.delay[target.platform] ?? 200
                if (index) await sleep(delay)

                if (event.message.quote) {
                    let quoteId: string | undefined
                    if (event.selfId === event.message.quote.user.id) {
                        logger.debug('selfId = quote.userId')
                        const row = rows.find(v => v.from_sid === targetSid && v.from_channel_id === target.channelId)
                        if (row) {
                            quoteId = row.from
                            logger.debug(`channelId: ${row.from_channel_id}`)
                        }
                    } else {
                        logger.debug('selfId != quote.userId')
                        const row = rows.find(v => v.to_sid === targetSid && v.to_channel_id === target.channelId)
                        if (row) {
                            quoteId = row.to
                            logger.debug(`channelId: ${row.to_channel_id}`)
                        }
                    }
                    if (quoteId) {
                        if (payload.children[0].type === 'author') {
                            // payload = <><message id="{quoteId}" forward />{payload}</>
                            payload.children.splice(1, 0, h.quote(quoteId))
                        } else {
                            payload.children.unshift(h.quote(quoteId))
                        }
                        logger.debug(`msgId: ${quoteId}`)
                        logger.debug(`added`)
                    } else {
                        const { user, elements } = event.message.quote
                        const re: h[] = [h.text(`Re ${user.nick || user.name} ⌈`), ...(elements || []), h.text('⌋\n')]
                        payload.children.unshift(...await new MessageParse(re, listened, session, sConfig).faceAsText().recordAsText().output())
                        logger.debug('not added')
                    }
                    logger.debug(`to sid: ${targetSid}`)
                }

                try {
                    logger.debug(payload)
                    const messageIds = await bot.sendMessage(target.channelId, payload)
                    for (const msgId of messageIds) {
                        sent.push({
                            from: event.message.id,
                            from_sid: `${event.platform}:${event.selfId}`,
                            to: msgId,
                            to_sid: targetSid,
                            from_channel_id: event.channel.id,
                            to_channel_id: target.channelId,
                            time: new Date()
                        })
                    }
                } catch (error) {
                    logger.error(error)
                }
            }

            if (sent.length !== 0) {
                ctx.database.upsert('myrtus_forward_sent', sent)
            }
        })
    }
}
