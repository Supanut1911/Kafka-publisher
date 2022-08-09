import { Module } from '@nestjs/common';
import { TestConsumer } from 'src/test.consumer';
import { ConsumerService } from './consumer.service';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';

@Module({
  controllers: [KafkaController],
  providers: [KafkaService, ConsumerService, TestConsumer],
})
export class KafkaModule {}
