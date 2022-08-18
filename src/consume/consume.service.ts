import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as dayjs from 'dayjs';

@Injectable()
export class ConsumeService {
  @Cron('10 * * * * *')
  async handleCron() {
    const dataCount = await this.getIncomeDayCount();
    if (dataCount) {
      for (let i = 1; i <= dataCount['totalPage']; i++) {
        console.log('iiiiiiii', i);

        await this.getIncomeDay(i, 10);
      }
    }
  }

  async getIncomeDayCount(): Promise<Number> {
    const today = dayjs().format('YYYY-MM-DD');
    const url = `http://localhost:4002/order/loop_count`;
    try {
      const dataCount = await axios({
        method: 'GET',
        url,
        data: {
          today,
          key: ` date, pay_amount, pay_token, amount_out, token_symbol, excgange_rate, price, fee, fee_amount, transaction,receive_type`,
        },
      });
      return dataCount.data;
    } catch (error) {
      console.log(`error=>`, error.message);
    }
  }

  async getIncomeDay(page: number, limit: number) {
    const today = dayjs().format('YYYY-MM-DD');
    const url = `http://localhost:4002/order/`;
    try {
      const data = await axios({
        method: 'Post',
        url,
        headers: {
          limit,
          page,
        },
        data: {
          today,
          key: ` date, pay_amount, pay_token, amount_out, token_symbol, excgange_rate, price, fee, fee_amount, transaction,receive_type`,
        },
      });
      console.log(
        '🚀 ~ file: consume.service.ts ~ line 48 ~ ConsumeService ~ data',
        data.data,
      );
      return data.data;
    } catch (error) {
      console.log(`error=>`, error);
    }
  }
}
