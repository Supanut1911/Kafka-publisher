import { Controller, Get } from '@nestjs/common';
import { ConsumeService } from './consume.service';

@Controller('consume')
export class ConsumeController {
  constructor(private readonly consumeService: ConsumeService) {}

  @Get()
  async getIncomeDay() {
    return this.consumeService.getIncomeDayCount();
  }
}
