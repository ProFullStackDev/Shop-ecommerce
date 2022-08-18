export enum NavigationBarLinkType {
  Home = 'home',
  MyList = 'myList',
  Dollars = 'dollars',
  Account = 'account'
}

export class NavigationBar {
  constructor(
    public link: string | null,
    public readonly name: string,
    public readonly icon: string | null,
    public readonly image: string | null,
    public readonly type: string
  ) {
  }
}
