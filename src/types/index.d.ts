export interface MessagePayload {
  topic: string;
  message: string;
  acks?: number;
  timeout?: number;
  compression?: number;
}
