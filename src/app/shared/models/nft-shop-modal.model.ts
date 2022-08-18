// export enum BuildingType {
//   Blank = 'blank',
//   Shop = 0,
//   Franchise,
//   SuperMarket,
//   Mall
// }
export enum BuildingType {
  Blank = 'blank',
  Shop = 'shop',
  Franchise = 'franchise',
  SuperMarket = 'superMarket',
  Mall = 'mall'
}

export class NftShopListDto {
  constructor(
    public readonly imageFrom: string,
    public readonly imageTo: string,
    public readonly buildingType: BuildingType,
    public readonly btnImage: string,
    public readonly btnText: string,
    public readonly amount: number,
    public merge: boolean,
    public ownedBefore: number,
    public ownedAfter: number
  ) {}
}
