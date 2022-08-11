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

export function encodeHashid(id: number | bigint) {
    return hashids.encode(id)
}

export function encodeResponse(data: unknown) {
    if (typeof data === 'bigint') {
        return encodeHashid(data)
    }
    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                data[i] = encodeResponse(data[i])
            }
            return data
        }
        for (const k in data) {
            data[k] = encodeResponse(data[k])
        }
        return data
    }
    return data
}
