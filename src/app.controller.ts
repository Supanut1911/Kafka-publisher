import { Controller, Get } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor(private readonly appService: AppService) {
    this.kafka = new Kafka({
      clientId: 'personB',
      brokers: ['localhost:29092'],
    });
    this.consumer = this.kafka.consumer({
      groupId: 'testX',
    });
    this.consumer.connect();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('publish')
  async publish() {
    await this.producer.send({
      topic: 'hi',
      messages: [
        { key: 'key1', value: 'hello world' },
        { key: 'key2', value: 'hey hey!' },
      ],
    });
  }
}
