import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FilesController } from './files.controller';
import { raw } from 'body-parser';
import { FilesService } from './files.service';
import { StorageService } from '../storage/storage.service';
import { LocalStorageAdapterService } from '../storage/local-storage-adapter.service';
import { DbService } from "../db/db.service";

@Module({
  controllers: [FilesController],
  providers: [
    FilesService,
    DbService,
    { provide: StorageService, useClass: LocalStorageAdapterService },
  ],
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(raw({ type: '*/*' })).forRoutes(FilesController);
  }
}
