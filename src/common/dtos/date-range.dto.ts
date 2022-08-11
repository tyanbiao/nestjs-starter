import { Type } from 'class-transformer'
import { IsOptional, IsDate } from 'class-validator'

export class DateRangeDto {
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    lt?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    lte?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    gt?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    gte?: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    equals?: Date
}
