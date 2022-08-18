export interface PayloadkeyDTO {
  date: string;
  pay_amount: number;
  pay_token: string;
  amount_out: number;
  token_symbol: string;
  excgange_rate: number;
  price: number;
  fee: number;
  fee_amount: number;
  transaction: string[];
  receive_type: string;
}
