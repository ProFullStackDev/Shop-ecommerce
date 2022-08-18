import {animate, AnimationTriggerMetadata, state, style, transition, trigger} from '@angular/animations';


export const MODAL_ANIMATION_DURATION = 400;

export const modalDrawerAnimations: {
  readonly transformDrawer: AnimationTriggerMetadata;
} = {
  /** Animation that slides a drawer in and out. */
  transformDrawer: trigger('transform', [
    // We remove the `transform` here completely, rather than setting it to zero, because:
    // 1. Having a transform can cause elements with ripples or an animated
    //    transform to shift around in Chrome with an RTL layout (see #10023).
    // 2. 3d transforms causes text to appear blurry on IE and Edge.
    state('open, open-instant', style({
      transform: 'none',
      visibility: 'visible',
    })),
    state('void', style({
      // Avoids the shadow showing up when closed in SSR.
      'box-shadow': 'none',
      visibility: 'hidden',
    })),
    transition('void => open-instant', animate('0ms')),
    transition('void <=> open, open-instant => void',
      animate(`${MODAL_ANIMATION_DURATION}ms 150ms cubic-bezier(0.25, 0.8, 0.25, 1)`))
  ])
};
