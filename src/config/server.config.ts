import { Config } from './config'

type ServerConfig = {
    hashids_salt: string
    hashids_length: number
}

const config: ServerConfig = {
    hashids_salt: process.env.HASHIDS_SALT ?? '',
    hashids_length: 6,
}

const serverConfig: Config<ServerConfig> = {
    development: { ...config },
    production: { ...config },
}

export default serverConfig
