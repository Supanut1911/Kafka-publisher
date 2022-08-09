import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['127.0.0.1:9092'],
  });
  private producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async publish() {
    try {
      await this.producer.send({
        topic: 'xxxx',
        messages: [
          {
            value: 'sss',
          },
        ],
      });
    } catch (error) {
      console.log(`error ${error}`);
    }
  }

  async onApplicationShutdown(signal: string) {}
}
