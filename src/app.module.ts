import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HelloModule } from './domains/hello/hello.module'
import Joi from 'joi'
import { ConfigKey } from './common/constants/config-key.constant'
import { HashidModule } from '@hyperbolajs/nestjs-kit'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            load: [],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'provision')
                    .default('development'),
                [ConfigKey.PROJECT_NAME]: Joi.string().optional(),
                [ConfigKey.SERVER_PORT]: Joi.number().default(3000),
            }),
            validationOptions: {
                abortEarly: true,
            },
        }),
        HashidModule.forRootAsync({
            isGlobal: true,
            useFactory: (config: ConfigService) => {
                return {
                    alphabet: '1234567890abcdef',
                    minLength: 6,
                    salt: config.get<string | undefined>(
                        ConfigKey.PROJECT_NAME
                    ),
                }
            },
            inject: [ConfigService],
        }),
        HelloModule,
    ],
})
export class AppModule {}
