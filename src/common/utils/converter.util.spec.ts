import { isNumeric, encodeEntitySync } from './converter.util'
import hashids from './hashids.util'

describe('common/utils/converter.ts:isNumeric', () => {
    test('isNumeric(10) === true', () => {
        expect(isNumeric(10)).toBe(true)
    })

    test('isNumeric(0) === true', () => {
        expect(isNumeric(0)).toBe(true)
    })

    test('isNumeric("10") === true', () => {
        expect(isNumeric('10')).toBe(true)
    })

    test('isNumeric("10.4") === true', () => {
        expect(isNumeric('10.4')).toBe(true)
    })

    test('isNumeric("10aadd") === false', () => {
        expect(isNumeric('10aadd')).toBe(false)
    })

    test('isNumeric(null) === false', () => {
        expect(isNumeric(null)).toBe(false)
    })

    test('isNumeric(undefined) === false', () => {
        expect(isNumeric(undefined)).toBe(false)
    })

    test('isNumeric([]) === false', () => {
        expect(isNumeric([])).toBe(false)
    })

    test('isNumeric("") === false', () => {
        expect(isNumeric('')).toBe(false)
    })

    test('isNumeric(" ") === false', () => {
        expect(isNumeric(' ')).toBe(false)
    })
})

describe('common/utils/converter.ts:isNumeric', () => {
    test('encodeEntitySync({ id: BigInt(10) })', () => {
        expect(encodeEntitySync({ id: BigInt(10) }).id).toStrictEqual(
            hashids.encode(BigInt(10))
        )
    })
})
