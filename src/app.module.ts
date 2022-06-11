import { Module } from '@nestjs/common'
import { HelloModule } from './domains/hello/hello.module'

@Module({
    imports: [HelloModule],
})
export class AppModule {}
