import { animate, animation, AnimationReferenceMetadata, keyframes, style } from '@angular/animations';

export const flyingShoppingCart: AnimationReferenceMetadata = animation(
  [
    style({ transform: 'translate({{startX}}px, {{startY}}px)' }),
    animate(
      '{{ duration }}ms ease-in',
      keyframes([
        style({ offset: 0.2, borderRadius: '25px' }),
        style({ offset: 1, transform: 'translate({{ endX }}px, {{ endY }}px)', opacity: 0 })
      ])
    )
  ],
  {
    params: {
      duration: 1000
    }
  }
);
