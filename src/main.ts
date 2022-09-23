import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ConfigKey } from './common/constants/config-key.constant'
import { ExceptionsFilter } from './common/filters/exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new ExceptionsFilter())
    const configService = app.get(ConfigService)
    const documentOptions = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('API 文档')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, documentOptions)
    SwaggerModule.setup('docs', app, document)
    await app.listen(configService.get<number>(ConfigKey.SERVER_PORT))
}
bootstrap()
