import {
    HashidInterceptor,
    HashidParam,
    NumberLike,
    RestfulInterceptor,
    wrapDataWithPagination,
} from '@hyperbolajs/nestjs-kit'
import { Controller, Get, UseInterceptors } from '@nestjs/common'

@Controller('hello')
@UseInterceptors(HashidInterceptor, RestfulInterceptor)
export class HelloController {
    @Get()
    list() {
        return wrapDataWithPagination(
            [
                {
                    id: BigInt(1),
                },
            ],
            1,
            {
                pageSize: 10,
                current: 1,
            }
        )
    }

    @Get(':id')
    get(@HashidParam('id') id: NumberLike) {
        return { id: Number(id) }
    }
}
