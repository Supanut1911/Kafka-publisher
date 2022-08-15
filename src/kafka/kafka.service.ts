import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka = new Kafka({
    clientId: 'my-app',
    // brokers: ['127.0.0.1:9092', '127.0.0.1:9093', '127.0.0.1:9094'],
    brokers: ['127.0.0.1:9092'],
  });
  private producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async publish(record?: ProducerRecord) {
    try {
      await this.producer.send({
        topic: 'test',
        messages: [
          {
            value: 'sss',
          },
        ],
      });
      return `publish success`;
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  async onApplicationShutdown(signal: string) {
    await this.producer.disconnect();
  }
}
