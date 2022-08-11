import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { decodeHashid } from '../utils/converter.util'

@Injectable()
export class ParseHashedIdPipe implements PipeTransform {
    transform(value: string, _metadata: ArgumentMetadata) {
        return decodeHashid(value)
    }
}
