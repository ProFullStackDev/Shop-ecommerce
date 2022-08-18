import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
