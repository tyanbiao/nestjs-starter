import config from '../../config'
import hashids from './hashids.util'

describe('common/utils/hashids.util', () => {
    test('encode number', () => {
        expect(hashids.encode(1).length).toEqual(
            config.serverConfig.hashids_length
        )
    })

    test('decode', () => {
        const hashid = hashids.encode(10)
        expect(hashids.decode(hashid)[0]).toEqual(10)
    })

    test('encode bigint', () => {
        expect(hashids.encode(BigInt(1)).length).toEqual(
            config.serverConfig.hashids_length
        )
    })
})
