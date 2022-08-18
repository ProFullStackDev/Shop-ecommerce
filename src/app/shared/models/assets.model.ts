export class AssetsList {
  constructor(
    public readonly image: string,
    public readonly title: string,
    public readonly owned: number,
    public readonly total: string,
    public readonly isOwned: boolean,
  ) {
  }
}
