import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Put,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response as Res } from 'express';
import { File } from "./file";

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Put('/:filename')
  async upload(
    @Param('filename') name: string,
    @Headers('Content-type') type: string,
    @Body() raw: any,
  ) {
    return this.filesService.save(name, type, raw);
  }

  @Get('/:filename')
  @UseInterceptors(FileInterceptor('file'))
  async download(@Param('filename') name: string, @Response() res: Res) {
    const file: File = await this.filesService.get(name);
    console.log({ file });
    res.header('Content-Type', file.type);
    res.header('Content-Length', file.size.toString(10));
    res.send(file.data);
  }
}
