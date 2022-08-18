export enum Modals {
  Build = 'build',
  Missions = 'missions',
  MyProfile = 'myProfile',
  Tokens = 'tokens',
  InviteFriends = 'inviteFriends',
  NftDetails = 'nftDetails',
  NftShop = 'nftShop',
  Messages = 'messages',
  TyqoonDollars = 'tyqoonDollars'
};

export class GameBoardActions {
  constructor(
    public readonly image: string | null,
    public readonly image2x: string | null,
    public readonly name: string,
    public readonly actionType: Modals,
    public readonly profileInfo?: ProfileInfo
  ) {}
}

export class ProfileInfo {
  constructor(public readonly level: number, public readonly statusImage: string) {}
}

export class ModalDto {
  constructor(public readonly title: string, public readonly image?: string) {}
}
