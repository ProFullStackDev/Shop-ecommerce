export interface NavBar {
  readonly title: string;
  readonly authList: LinksList[];
  readonly funList: LinksList[];
  readonly merchantServices: MerchantServices;
  readonly qrList: QrList;
}

export interface LinksList {
  readonly name: string;
  readonly link: string;
}

export interface MerchantServices {
  readonly name: string;
  readonly links: MerchantServicesList[];
}

export interface MerchantServicesList {
  readonly name: string;
  readonly link: string;
}

export interface QrList {
  readonly name: string;
  readonly list: QrCodes[];
}

export interface QrCodes {
  readonly image: string;
  readonly name: string;
}

export interface NavBarList {
  readonly text: string;
  readonly navLink: string | null;
  readonly action: boolean;
}
