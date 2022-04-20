import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LocalStorageAdapterService extends StorageService {
  private uploadDir: string;

  constructor() {
    super();
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async save(name: string, data: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(path.join(this.uploadDir, name));
      stream.on('finish', function () {
        resolve();
      });
      stream.once('error', function (e) {
        reject(e);
      });
      stream.write(data);
      stream.end();
    });
  }
  async read(name: string): Promise<Buffer> {
    console.log({ name });
    const chunks = [];
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path.join(this.uploadDir, name));
      stream.on('data', function (chunk) {
        chunks.push(chunk);
      });
      stream.once('error', function (e) {
        // console.log({ e });
        reject(e);
      });
      stream.on('end', function () {
        resolve(Buffer.concat(chunks));
      });
    });
  }
}
