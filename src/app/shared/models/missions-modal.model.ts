export class MissionsListDto {
  constructor(
    public readonly image: string,
    public readonly title: string,
    public readonly complete: number | null,
    public readonly maxShops: number | null,
    public readonly btnText: string,
    public readonly amount: number
  ) {
  }
}
