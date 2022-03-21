import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalFilesModule } from './local-files/local-files.module';
import { UserModule } from './user/user.module';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    LocalFilesModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
