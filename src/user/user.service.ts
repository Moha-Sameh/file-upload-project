import { Injectable, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { LocalFilesService } from '../local-files/local-files.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private localFilesService: LocalFilesService,
  ) {}

  async addAvatar(userId: number, fileData: LocalFileDto) {
    const avatar = await this.localFilesService.saveLocalFileData(fileData);
    return avatar;
  }
  async addImages(userId: number, fileData: LocalFileDto[]) {
    console.log(fileData);

    const images = await this.localFilesService.saveLocalFilesData(fileData);
    let imageIds = [];
    images.map((image) => {
      imageIds.push(image.id);
    });
    const { avatarId } = await this.usersRepository.findOne(1);
    const userImages = await this.usersRepository.update(1, {
      avatarId: imageIds.concat(...avatarId),
    });
    return userImages;
  }
}
