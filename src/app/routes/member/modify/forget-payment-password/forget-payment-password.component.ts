import { Component, ViewEncapsulation } from '@angular/core';

interface SyncStep {
  id: number;
  title: string;
  description: string;
  async: false;
  percentage: null;
}

interface AsyncStep {
  id: number;
  title: string;
  description: string;
  async: true;
  percentage: number;
}

type Step = SyncStep | AsyncStep;

@Component({
  selector: 'app-forget-payment-password',
  templateUrl: './forget-payment-password.component.html',
  styleUrls: ['./forget-payment-password.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ForgetPaymentPasswordComponent {
  constructor() {}

  steps: Step[] = [
    {
      id: 1,
      title: '第一步',
      description: `获取短信验证码`,
      async: true,
      percentage: 0
    },
    {
      id: 2,
      title: '第二步',
      description: '重置密码',
      async: true,
      percentage: 0
    },
    {
      id: 3,
      title: `完成`,
      description: `重置成功`,
      async: true,
      percentage: 0
    }
  ];
  params = {
    current: 0, //
    mobileArea: '+86',
    mobile: '',
    smsCode: ''
  };
  processing = false;

  pre(): void {
    this.params.current -= 1;
  }

  next(): void {
    this.loadingAndStep();
  }

  trackById(_: number, item: Step): number {
    return item.id;
  }

  loadingAndStep(): void {
    if (this.params.current < this.steps.length) {
      const step = this.steps[this.params.current];
      if (step.async) {
        step.percentage = 0;
        this.processing = false;
        this.params.current += 1;
      } else {
        this.params.current += 1;
      }
    }
  }
}
