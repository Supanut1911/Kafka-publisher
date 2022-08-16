import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka = new Kafka({
    clientId: 'my-app',
    // brokers: ['127.0.0.1:9092', '127.0.0.1:9093', '127.0.0.1:9094'],
    // brokers: ['http://kafka.finstable.co.th/'],
    // brokers: ['54.255.182.90:9092'],
    brokers: ['127.0.0.1:9092'],
  });
  private producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async publish(record?: ProducerRecord) {
    try {
      await this.producer.send({
        topic: 'hi',
        messages: [
          {
            value:
              'date: Thu Aug 04 2022 00:00:00 GMT+0000,pay_amount: 116.209836607918,pay_token: PHCP,amount_out: 3.31778087935719,token_symbol: USDT,excgange_rate: 36.1678496451064,price: 120.6,fee: 0.5,fee_amount: 0.603,amount_out: 120,transaction: [https://bscscan.com/tx/0x6323a859805b8719094d160ac3bc6acd94ba67f3eb5e218114ed7b93ba6e6908](https://bscscan.com/tx/0x6323a859805b8719094d160ac3bc6acd94ba67f3eb5e218114ed7b93ba6e6908),receive_type: Token,',
          },
          {
            value:
              'date: Thu Aug 04 2022 10:10:10 GMT+0000,pay_amount: 120,pay_token: PHCP,amount_out: 4,token_symbol: USDT,excgange_rate: 37,price: 130,fee: 0.5,fee_amount: 0.8,amount_out: 140,transaction: [https://bscscan.com/tx/0x6323a859805b8719094d160ac3bc6acd94ba67f3eb5e218114ed7b93ba6e6908](https://bscscan.com/tx/0x6323a859805b8719094d160ac3bc6acd94ba67f3eb5e218114ed7b93ba6e6908),receive_type: Token',
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
