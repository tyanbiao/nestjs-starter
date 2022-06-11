import { Controller, Get } from '@nestjs/common'
import { restfulJSON } from '../../common/utils/restful.util'

@Controller('hello')
export class HelloController {
    @Get()
    home() {
        return restfulJSON({
            message: 'Hello World!',
        })
    }
}
