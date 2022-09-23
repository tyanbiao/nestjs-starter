import { restfulError } from '@hyperbolajs/nestjs-kit'
import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException,
} from '@nestjs/common'

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
            data.message = exception.message
            if (typeof payload === 'string') {
                data.message = `${data.message}: ${payload}`
            } else if (typeof payload === 'object') {
                const t = payload as {
                    code?: number
                    message?: string
                }
                data.code = t?.code ?? data.code
                data.message = data.message + ' ' + (t?.message ?? '')
            }
        }
        response.status(status).json(data)
    }
}
