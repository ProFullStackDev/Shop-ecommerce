import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
@Component({
  selector: 'app-review-score',
  templateUrl: './review-score.component.html',
  styleUrls: ['./review-score.component.less']
})
export class ReviewScoreComponent extends DestroySubscription {
  constructor() {
    super();
  }
  score = 5;
  stars = [
    { active: true, index: 5 },
    { active: true, index: 4 },
    { active: true, index: 3 },
    { active: true, index: 2 },
    { active: true, index: 1 }
  ];

  @Input()
  disabled = false;

  @Input()
  get starScore() {
    return this.score;
  }

  set starScore(val) {
    this.isActive(val);
  }

  @Output()
  readonly starScoreChange: EventEmitter<number> = new EventEmitter<number>();

  isActive(index: number) {
    this.stars = this.stars.map(item => {
      if (item.index <= index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
    this.score = index;
    this.starScoreChange.emit(this.score);
  }

  checkStars(index: number) {
    if (this.disabled) {
      return;
    }
    this.isActive(index);
  }

  previewStars(index: number) {
    if (this.disabled) {
      return;
    }
    this.stars = this.stars.map(item => {
      if (item.index <= index) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
  }

  recoverStars() {
    if (this.disabled) {
      return;
    }
    this.stars = this.stars.map(item => {
      if (item.index <= this.score) {
        item.active = true;
      } else {
        item.active = false;
      }
      return item;
    });
  }
}
