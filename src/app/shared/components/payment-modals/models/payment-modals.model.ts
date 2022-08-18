export enum ButtonType {
  Crypt = 'crypt',
  Alipay = 'alipay',
  Wechat = 'wechat',
  Payments = 'payments',
}

export interface BuyCreditsPayload {
  readonly amount: number;
  readonly type: ButtonType;
}

export interface SendCreditsPayload {
  readonly amount: number;
  readonly username: string;
}

export interface BuyGiftPayload {
  readonly amount: number;
  readonly type: ButtonType;
}

export interface RedeemCodePayload {
  readonly code: string;
}
