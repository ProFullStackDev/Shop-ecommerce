export enum SelectType {
  Currency = 'currency',
  Language = 'language'
};

export class DropdownItem {
  constructor(
    public readonly id: number,
    public readonly icon: string | null,
    public readonly currency: string | null,
    public readonly lang: string | null,
    public readonly text: string
  ) {
  }
};
