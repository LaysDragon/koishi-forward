import { Schema, Dict, Time } from 'koishi'

interface Source {
    channelId: string
    name: string
    platform: string
    blockingWords: string[]
    selfId: string

    onebot_expendapi_endpoint?: string;
    onebot_expendapi_token?: string;
}
interface Target {
    selfId: string
    channelId: string
    platform: string
    disabled: boolean
    simulateOriginal: boolean
}

interface SourceConst extends Source {
    type: 'source'
}
interface TargetConst extends Target {
    type: 'target'
}
interface FullConst extends Target, Source {
    type: 'full'
}

export type RuleTarget = TargetConst | FullConst
export type RuleSource = SourceConst | FullConst

export interface Config {
    constants: Dict<SourceConst | TargetConst | FullConst, string>
    rules: {
        source: string
        targets: string[]
    }[]
    delay: Record<string, number>
}


const share =
    Schema.intersect([
        Schema.object({
            platform: Schema.string().required(),
            channelId: Schema.string().required()
        }),
        Schema.union([
            Schema.object({
                platform: Schema.const('onebot').required(),
                onebot_expendapi_endpoint: Schema.string(),
                onebot_expendapi_token: Schema.string().role('secret'),
            }),
            Schema.object({
                onebot_expendapi_endpoint: Schema.string().hidden(true),
                onebot_expendapi_token: Schema.string().hidden(true),
            }),
        ]),
    ])

const sourceConst: Schema<SourceConst> = Schema.intersect([
    Schema.object({
        type: Schema.const('source').required(),
        name: Schema.string(),
        // ...share,
        selfId: Schema.string().default('*'),
        blockingWords: Schema.array(String).role('table').default([])
    }),
    share,
]);

const targetConst: Schema<TargetConst> = Schema.intersect([
    Schema.object({
        type: Schema.const('target').required(),
        // ...share,
        selfId: Schema.string().required(),
        simulateOriginal: Schema.boolean().default(false),
        disabled: Schema.boolean().default(false)
    }),
    share
]);
const fullConst: Schema<FullConst> = Schema.intersect([
    Schema.object({
        type: Schema.const('full').required(),
        name: Schema.string(),
        // ...share,
        selfId: Schema.string().required(),
        blockingWords: Schema.array(String).role('table').default([]),
        simulateOriginal: Schema.boolean().default(false),
        disabled: Schema.boolean().default(false)
    }),
    share
]);
export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
        constants: Schema.dict(Schema.intersect([
            Schema.object({
                type: Schema.union([
                    Schema.const('source'),
                    Schema.const('target'),
                    Schema.const('full')
                ]).role('radio').required()
            }),
            Schema.union([
                sourceConst,
                targetConst,
                fullConst
            ])
        ]))
    }),
    Schema.object({
        rules: Schema.array(Schema.object({
            source: Schema.string().required(),
            targets: Schema.array(String).role('table')
        })),
        delay: Schema.dict(Schema.natural().role('ms').default(0.2 * Time.second))
    })
]).i18n({
    'zh-CN': require('./locales/zh-CN')
})
