import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LocalFile from './entities/local-file.entity';

@Injectable()
export class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {}

  async getFileById(fileId: number) {
    const file = await this.localFilesRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = this.localFilesRepository.create(fileData);
    await this.localFilesRepository.save(newFile);
    return newFile;
  }
  async saveLocalFilesData(fileData: LocalFileDto[]) {
    let files = [];
    fileData.map(async (file) => {
      const newFile = this.localFilesRepository.create(file);
      files.push(newFile);
    });
    return this.localFilesRepository.save(files);
  }
}
