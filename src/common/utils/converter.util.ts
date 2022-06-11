import hashids from './hashids.util'

export function isNumeric(num: any): boolean {
    if (typeof num === 'number') {
        return true
    }

    if (typeof num !== 'string') {
        return false
    }

    return !isNaN(+num) && !isNaN(parseFloat(num))
}

export type Entity = {
    id: number
}

export async function encodeEntity<T extends { id: number | bigint } | null>(
    entity: T | Promise<T>
): Promise<T | { id: string }> {
    const ret = await entity
    return ret && { ...entity, id: hashids.encode(ret.id) }
}

export function encodeEntitySync<T extends { id: number | bigint } | null>(
    entity: T
): T | { id: string } {
    return entity && { ...entity, id: hashids.encode(entity.id) }
}

export function decodeHashid(hashid: string) {
    return hashids.decode(hashid)[0]
}
