import { Module } from '@nestjs/common';
import { HttpTwoService } from './services/http-two.service';

@Module({
  providers: [HttpTwoService],
  exports: [HttpTwoService],
})
export class HttpTwoModule {}
