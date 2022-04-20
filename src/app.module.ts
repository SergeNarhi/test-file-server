import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { DbService } from './db/db.service';

@Module({
  imports: [FilesModule],
  providers: [DbService],
})
export class AppModule {}
