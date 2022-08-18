import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-scroll-controls',
	templateUrl: './scroll-controls.component.html',
	styleUrls: ['./scroll-controls.component.scss']
})
export class ScrollControlsComponent implements OnInit, OnDestroy {
	public scroll$ = new Subject<'left' | 'right'>();
	constructor() {}

	ngOnInit() {}

	ngOnDestroy() {
		this.scroll$.complete();
	}

	public scrollRight(): void {
		this.scroll$.next('right');
	}

	public scrollLeft(): void {
		this.scroll$.next('left');
	}
}
