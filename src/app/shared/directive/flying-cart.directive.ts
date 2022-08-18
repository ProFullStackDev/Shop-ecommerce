import { AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { flyingShoppingCart } from '@shared/animations/shopping-cart';

@Directive({
  selector: '[appFlyingCart]'
})
export class FlyingCartDirective {
  constructor(private el: ElementRef, private animationBuilder: AnimationBuilder) {}

  @Input('appFlyingCart') cover: string = '';

  @HostListener('click') mouseClick() {
    const { x: btnX, y: btnY, width: btnW, height: btnH } = this.el.nativeElement.getBoundingClientRect();
    const shoppingCart = document.querySelector('.dashboard-header__shop-info');
    if (!shoppingCart) return;
    const { x: badgeX, y: badgeY, width: badgeW, height: badgeH } = shoppingCart.getBoundingClientRect();
    const image = new Image(50, 50);
    image.src = this.cover;
    image.style.position = 'absolute';
    image.style.zIndex = '999';
    this.el.nativeElement.appendChild(image);
    const startX = btnX + (1 / 2) * btnW;
    const startY = btnY + (1 / 2) * btnH;
    const endX = badgeX + (1 / 2) * badgeW - startX;
    const endY = badgeY + (1 / 2) * badgeH - startY;
    // const topY = Math.min(endY, 0);
    // const topX = endX / 2;
    const animate = this.animationBuilder.build(flyingShoppingCart);
    const animatePlayer = animate.create(image, {
      params: {
        // topX,
        // topY,
        endX,
        endY,
        startX: -(1 / 2) * btnW,
        startY: -btnH,
        duration: 1000
      }
    });
    animatePlayer.play();
    animatePlayer.onDone(() => {
      this.el.nativeElement.removeChild(image);
    });
  }
}
