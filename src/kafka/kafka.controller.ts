import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly consumerService: ConsumerService,
  ) {}

  @Get()
  async publish() {
    return this.kafkaService.publish();
  }

  @Post()
  async validatePayloadKey(@Body() payload: any) {
    // return this.consumerService.validatePayload(payload);
  }
}
