import { UserService } from './user.service';
import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import LocalFilesInterceptor from '../local-files/localFiles.interceptor';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('avatar')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/avatars',
    }),
  )
  async addAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.addAvatar(1, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Post('multiple')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      maxCount: 20,
      path: '/products',
    }),
  )
  async uploadMultipleFiles(
    @Req() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(req);

    const response = [];
    files.forEach((file: any) => {
      const fileReponse = {
        path: file.path,
        mimetype: file.mimetype,
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });

    return this.usersService.addImages(1, response);
  }
}
