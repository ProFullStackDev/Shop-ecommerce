export class DropdownItem<T> {
  constructor(
    public readonly title: string,
    public readonly value: T,
  ) {
  }
}
