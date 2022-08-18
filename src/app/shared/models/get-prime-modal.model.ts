export enum PlanType {
  NoPrime = 'no prime',
  Bronze = 'bronze',
  Silver = 'silver',
  Gold = 'gold'
}

export class PlanList {
  constructor(
    public readonly image: string,
    public readonly type: string,
    public readonly days: string,
    public readonly oldPrice: number | null,
    public readonly price: number,
    public readonly value: PlanType,
    public readonly description: PlansDescription[],
    public readonly skuId: string
  ) {}
}

export class PlansDescription {
  constructor(public readonly text: string) {}
}

export class PlansList {
  constructor(public readonly image: string, public readonly days: string, public price: string, public readonly value: PlanType) {}
}
