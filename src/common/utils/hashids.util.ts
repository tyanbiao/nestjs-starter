import Hashids from 'hashids'
import config from '../../config'

const {
    serverConfig: { hashids_salt, hashids_length },
} = config

const hashids = new Hashids(hashids_salt, hashids_length)

export default hashids
