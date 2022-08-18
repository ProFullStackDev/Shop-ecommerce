export class ProductsCategories {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly link: string,
    public readonly icon: string,
    public readonly subList: ProductsCategoriesSubItem[]
  ) {}
}

export class ProductsCategoriesSubItem {
  constructor(public readonly id: string, public readonly title: string, public readonly links: ProductsCategoriesLinks[]) {}
}

export class ProductsCategoriesLinks {
  constructor(public readonly id: string, public readonly link: string, public readonly text: string) {}
}

export class PagesList {
  constructor(public readonly label: string, public readonly link: string, public readonly attribute: object) {}
}
