import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConsumeController } from './consume.controller';
import { ConsumeService } from './consume.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ConsumeController],
  providers: [ConsumeService],
})
export class ConsumeModule {}
