import serverConfig from './server.config'

const __DEV__ = process.env.NODE_ENV === 'development'

const config = {
    serverConfig: __DEV__ ? serverConfig.development : serverConfig.production,
}
console.log(config)
export default config
