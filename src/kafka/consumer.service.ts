import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private kafka: Kafka = new Kafka({
    brokers: ['127.0.0.1:9092', '127.0.0.1:9093', '127.0.0.1:9094'],
  });

  private readonly consumers: Consumer[] = [];

  async onModuleInit() {}

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown(signal: string) {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
