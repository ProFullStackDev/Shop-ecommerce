export enum SearchCategories {
  Merchandise = '商品',
  Shop = '店铺'
}

export interface HotSearchDto {
  readonly label: string;
  readonly list: HotSearchList[];
}

export class HotSearchList {
  constructor(
    public readonly value: string
  ) {
  }
}
