import { Injectable } from '@angular/core';
import {
  BuyCreditsPayload,
  BuyGiftPayload, RedeemCodePayload,
  SendCreditsPayload
} from "@shared/components/payment-modals/models/payment-modals.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentModalsService {

  constructor() { }

  buyCreditsData(data: BuyCreditsPayload) {
    console.log(data);
  }

  sendCreditsData(data: SendCreditsPayload) {
    console.log(data);
  }

  buyGiftData(data: BuyGiftPayload) {
    console.log(data);
  }

  redeemCodeData(data: RedeemCodePayload) {
    console.log(data);
  }
}
