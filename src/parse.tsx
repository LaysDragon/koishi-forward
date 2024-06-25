import { Bot, Context, Logger, Session, h, segment } from 'koishi'
import { DiscordBot } from "@koishijs/plugin-adapter-discord";
import { OneBotBot } from "koishi-plugin-adapter-onebot";
import { RuleSource } from './config';
import mime from 'mime';


export class MessageParse {
    private faceEnable = false
    private recordEnable = false
    private atEnable = false
    private logger: Logger;

    constructor(private message: h[], private ctx: Context, private session: Session, private config: RuleSource) {
        this.logger = this.ctx.logger('forward[MessageParse]');
    }

    faceAsText() {
        this.faceEnable = true
        return this
    }
    recordAsText() {
        this.recordEnable = true
        return this
    }
    async output(): Promise<any> {
        let pThis = this;
        // const segs: segment = <></>;
        return await segment.transformAsync(this.message, {
            // from qq and discord
            face(attrs, children, session) {
                if (pThis.faceEnable) {
                    let content = '[表情]'
                    const faceName = attrs.name
                    if (faceName) {
                        content = `[${[faceName]}]`
                    }
                    return h('text', { content })
                }

                switch (session.platform) {
                    case 'discord':
                        return attrs.animated
                            ? <img src={`https://cdn.discordapp.com/emojis/${attrs.id}?quality=lossless&size=64`} />
                            : <img src={`https://cdn.discordapp.com/emojis/${attrs.id}?size=64`} />;
                    default:
                        return <face {...attrs}>{...children}</face>;
                }
            },
            // from onebot qq
            mface(attrs, children, session) {
                return <img src={attrs.url} title={attrs.summary} />
            },
            // from discord
            sticker(attrs, children, session) {
                return <img src={`https://cdn.discordapp.com/stickers/${attrs.id}?size=160`} title={attrs.name} />
            },
            async file(attrs, children, session) {
                switch (session.platform) {
                    case 'onebot': {
                        if (attrs.src && (attrs.src as string).startsWith('http')) {
                            return <audio src={attrs.src} />
                        }

                        let endpoint = pThis.config.onebot_expendapi_endpoint;
                        let token = pThis.config.onebot_expendapi_token;
                        if (!pThis.config.onebot_expendapi_endpoint?.trim()) {
                            pThis.logger.warn('未配置 onebot_expendapi_endpoint，無法將qq檔案下載回本地');
                            return '[不支持的 QQ檔案]';
                            // return <a href={attrs.url}>`[語音: ${attrs.file}]`</a>
                        }
                        let endpointUrl = new URL(endpoint);
                        endpointUrl.pathname = 'get_file';
                        pThis.logger.info('獲取檔案中', attrs.file);
                        let resp = await pThis.ctx.http.post(endpointUrl.toString(), {
                            file_id: attrs.fileId,
                        }, {
                            headers: {
                                Authorization: `Bearer ${token} `
                            }
                        });
                        if (resp.status !== 'ok') {
                            pThis.logger.error('檔案下載失敗', resp);
                            return `[檔案: ${attrs.file} 轉發失敗]`;
                        }
                        pThis.logger.info('檔案獲取完成', attrs.file);
                        let base64 = resp.data.base64;
                        let contentType = mime.getType(attrs.file);
                        let dataSrc = `data:${mime.getType(attrs.file)};base64,${base64}`;
                        if (contentType.startsWith('video')) {
                            return <video src={dataSrc} title={attrs.file} />
                        }
                        return <file src={dataSrc} title={attrs.file} />
                    }
                    default:
                        return <file src={attrs.src} />

                }
            },
            async audio(attrs, children, session) {
                switch (session.platform) {
                    case 'onebot': {
                        if ((attrs.src as string).startsWith('http')) {
                            return <audio src={attrs.src} />
                        } else {
                            return '[不支持的 QQ語音消息]';
                        }



                        let endpoint = pThis.config.onebot_expendapi_endpoint;
                        let token = pThis.config.onebot_expendapi_token;
                        if (!pThis.config.onebot_expendapi_endpoint?.trim()) {
                            pThis.logger.warn('未配置 onebot_expendapi_endpoint，無法將qq語音下載回本地');
                            return '[不支持的 QQ語音消息]';
                            // return <a href={attrs.url}>`[語音: ${attrs.file}]`</a>
                        }
                        let endpointUrl = new URL(endpoint);
                        endpointUrl.pathname = 'get_record';
                        let resp = await pThis.ctx.http.post(endpointUrl.toString(), {
                            out_format: 'ogg',
                            file: attrs.file,
                        }, {
                            headers: {
                                Authorization: `Bearer ${token} `
                            }
                        });
                        if (resp.status !== 'ok') {
                            pThis.logger.error('語音下載失敗', resp);
                            return `[語音: ${attrs.file} 轉發失敗]`;
                        }
                        let base64 = resp.data.base64;
                        return <audio src={`data: audio / ogg; base64, ${base64} `} file="voice-message.ogg" type="audio/ogg" size={resp.data.file_size} />
                    }
                    default:
                        return <audio href={attrs.src} />

                }
            },
            // from discord
            record(attrs, children, session) {
                return <audio src={attrs.src} />
            },
            async at(attrs, children, session) {
                switch (session.platform) {
                    case 'discord': {
                        let bot = session.bot as unknown as DiscordBot;
                        if (attrs.name) {
                            return `@${attrs.name} `
                        }
                        if (attrs.id) {
                            let member = await bot.getGuildMember(session.guildId, attrs.id);
                            return `@${member.user.nick || member.name || member.user.id} `;
                        }
                        if (attrs.role) {
                            let roles = (await bot.getGuildRoleList(session.guildId)).data;
                            return `@[身分]${roles.find(r => r.id === attrs.role)?.name ?? '未知'} `;
                        }
                        if (attrs.type === "here") {
                            return `@${attrs.type} `;
                        }
                        if (attrs.type === "all") {
                            return "@everyone";
                        }
                    }
                    case 'onebot': {
                        let bot = session.bot as unknown as OneBotBot<Context, OneBotBot.Config>;
                        let member = await bot.getGuildMember(session.guildId, attrs.id);
                        return `@${member.nick || member.user.name || member.user.id} `;
                    }
                    default:
                        return `@${attrs.name || attrs.id || attrs.role} `;
                }

            }
        }, this.session);
    }
}
