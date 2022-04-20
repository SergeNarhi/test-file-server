import { Injectable } from '@nestjs/common';
import { File, FileMeta } from "../files/file";

@Injectable()
export class DbService {
  private _store: Record<string, FileMeta> = {};

  findById(id): FileMeta {
    return this._store[id];
  }

  upsert(id, record: FileMeta) {
    this._store[id] = record;
  }
}
