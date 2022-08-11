import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt } from 'class-validator'
import { decodeHashid } from '../utils/converter.util'

export class HashedIdParamsDto {
    @IsInt()
    @Transform(({ value }) => decodeHashid(value))
    @ApiProperty({ type: String })
    id: number | bigint
}
