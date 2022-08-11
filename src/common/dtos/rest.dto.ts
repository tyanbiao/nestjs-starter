import { ApiProperty } from '@nestjs/swagger'

export abstract class RestDto<T = any> {
    @ApiProperty({ description: '错误码， 0表示成功', example: 0 })
    code: number

    @ApiProperty({ description: '错误信息', example: 'success' })
    message: string

    abstract data: T | null
}
