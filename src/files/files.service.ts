import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { File } from './file';
import { DbService } from '../db/db.service';

@Injectable()
export class FilesService {
  constructor(private storageService: StorageService, private db: DbService) {}

  async save(name: string, type: string, data: Buffer) {
    this.db.upsert(name, { name, type, size: data.length });
    return this.storageService.save(name, data);
  }

  async get(name: string): Promise<File> {
    let data;
    try {
      data = await this.storageService.read(name);
    } catch (e) {
      console.log({ e });
      if (e.code === 'ENOENT') {
        throw new NotFoundException(`File ${name} not found`);
      }
    }
    const fileMeta = this.db.findById(name);
    return { ...fileMeta, data };
  }
}
