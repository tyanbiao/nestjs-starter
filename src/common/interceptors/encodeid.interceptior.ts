import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { encodeResponse } from '../utils/converter.util'

@Injectable()
export class EncodeidInterceptor<T> implements NestInterceptor<T, any> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(encodeResponse))
    }
}
