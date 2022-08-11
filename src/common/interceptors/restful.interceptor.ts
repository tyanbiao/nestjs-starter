import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface RestfullResponse<T> {
    data: T
    code: number
    message: string
}

@Injectable()
export class RestfulInterceptor<T>
    implements NestInterceptor<T, RestfullResponse<T>>
{
    intercept(
        _context: ExecutionContext,
        next: CallHandler
    ): Observable<RestfullResponse<T>> {
        return next
            .handle()
            .pipe(map((data) => ({ data, code: 0, message: 'success' })))
    }
}
