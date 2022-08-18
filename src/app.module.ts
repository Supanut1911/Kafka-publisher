import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumeModule } from './consume/consume.module';

@Module({
  imports: [
    // KafkaModule
  ConsumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
