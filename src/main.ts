import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [
          'localhost:9092',
          // process.env.KAFKA_BROKER_2,
          // process.env.KAFKA_BROKER_3,
        ],
      },
      consumer: {
        groupId: 'Publisher-app',
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(4001);
}
bootstrap();
