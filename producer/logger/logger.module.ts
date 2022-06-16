import { Module } from '@nestjs/common';
import { LogService } from './logger.service';
@Module({
  imports: [],
  exports: [LogService],
  providers: [LogService]
})
export class LogsModule { }