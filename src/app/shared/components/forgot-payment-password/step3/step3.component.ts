import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

// @Output() newItemEvent = new EventEmitter<string>();
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.less']
})
export class forgetStep3Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  closeDialog() {
    console.log(44444444);
  }
}
