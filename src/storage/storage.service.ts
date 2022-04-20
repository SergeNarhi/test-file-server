import { Injectable } from '@nestjs/common';

export interface IStorage {
  save(fileName: string, data: Buffer): Promise<void>;
  read(fileName: string): Promise<Buffer>;
}

@Injectable()
export abstract class StorageService implements IStorage {
  abstract save(fileName: string, data: Buffer): Promise<void>;

  abstract read(fileName: string): Promise<Buffer>;
}
