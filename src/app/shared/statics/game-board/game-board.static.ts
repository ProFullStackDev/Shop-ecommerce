import { GameBoardActions, Modals, ProfileInfo } from '@routes/dashboard/models/game-board';

const PROFILE_INFO: ProfileInfo = new ProfileInfo(1, '/assets/images/game-board/prime.svg');

export const GAME_BOARD_ACTIONS: GameBoardActions[] = [
  new GameBoardActions('/assets/images/shop.png', '/assets/images/shop@2x.png', 'game-nav-build-empire', Modals.NftShop),
  new GameBoardActions('/assets/images/checklist-CC.png', '/assets/images/checklist-CC@2x.png', 'game-nav-missions', Modals.Missions),
  // new GameBoardActions('/assets/images/avatar.jpg', '/assets/images/avatar@2x.jpg', 'Johnbob123', Modals.MyProfile, PROFILE_INFO),
  new GameBoardActions('/assets/images/avatar.jpg', '/assets/images/avatar@2x.jpg', 'Johnbob123', Modals.MyProfile, PROFILE_INFO),
  new GameBoardActions(
    '/assets/images/TYQOON-Dollars-cc-small.png',
    '/assets/images/TYQOON-Dollars-cc-small.png',
    'game-nav-earn-dollars',
    Modals.TyqoonDollars
  ),
  new GameBoardActions(null, null, 'game-nav-invite', Modals.InviteFriends)
];
