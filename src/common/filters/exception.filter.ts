import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException,
} from '@nestjs/common'
import { restfulError } from '../utils/restful.util'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse()
        let status = HttpStatus.INTERNAL_SERVER_ERROR
        const data = restfulError(exception, status)
        if (exception instanceof HttpException) {
            status = exception.getStatus()
            data.code = status
            const payload = exception.getResponse()
            typeof payload === 'object' &&
                (data.code = (payload as { code?: number })?.code || status)
            data.message = exception.message
        }
        response.status(status).json(data)
    }
}
