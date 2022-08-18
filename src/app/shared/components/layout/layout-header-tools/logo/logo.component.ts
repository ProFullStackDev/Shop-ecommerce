import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <app-tyqoon-icon name="logo"></app-tyqoon-icon>
  `,
  styles: [
    `
      .logo img {
        max-width: 190px;
      }
    `
  ]
})
export class LogoComponent {
  constructor() {}
}
