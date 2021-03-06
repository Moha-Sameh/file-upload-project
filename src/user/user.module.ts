import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { LocalFilesModule } from 'src/local-files/local-files.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LocalFilesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
