import { PlanList, PlansDescription, PlansList, PlanType } from '@shared/models/get-prime-modal.model';

const BRONZE_PLAN: PlansDescription[] = [
  new PlansDescription('prime-bronze-perk-one'),
  new PlansDescription('prime-bronze-perk-two'),
  new PlansDescription('prime-bronze-perk-three')
];

const SILVER_PLAN: PlansDescription[] = [
  new PlansDescription('prime-silver-perk-one'),
  new PlansDescription('prime-silver-perk-two'),
  new PlansDescription('prime-silver-perk-three')
];

const GOLD_PLAN: PlansDescription[] = [
  new PlansDescription('prime-gold-perk-one'),
  new PlansDescription('prime-gold-perk-two'),
  new PlansDescription('prime-gold-perk-three')
];

export const PLAN_LIST: PlanList[] = [
  new PlanList(
    '/assets/images/get-prime-modal/ticket-bronze.png',
    'prime-bronze-title',
    'prime-bronze-subtitle',
    null,
    20,
    PlanType.Bronze,
    BRONZE_PLAN,
    '1'
  ),
  new PlanList(
    '/assets/images/get-prime-modal/ticket-silver.png',
    'prime-silver-title',
    'prime-silver-subtitle',
    null,
    399,
    PlanType.Silver,
    SILVER_PLAN,
    '2'
  ),
  new PlanList(
    '/assets/images/get-prime-modal/ticket-gold.png',
    'prime-gold-title',
    'prime-gold-subtitle',
    null,
    699,
    PlanType.Gold,
    GOLD_PLAN,
    '3'
  )
];

export const PLANS_LIST: PlansList[] = [
  new PlansList('/assets/images/get-prime-modal/ticket-none.png', 'shop-product-page-reward-days-365', '0.00', PlanType.NoPrime),
  new PlansList('/assets/images/get-prime-modal/ticket-bronze.png', 'shop-product-page-reward-days-180', '666.66', PlanType.Bronze),
  new PlansList('/assets/images/get-prime-modal/ticket-silver.png', 'shop-product-page-reward-days-90', '1333.33', PlanType.Silver),
  new PlansList('/assets/images/get-prime-modal/ticket-gold.png', 'shop-product-page-reward-days-30', '4000.00', PlanType.Gold)
];
