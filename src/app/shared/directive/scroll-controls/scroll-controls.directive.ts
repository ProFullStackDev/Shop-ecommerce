import {
	AfterViewInit,
	ChangeDetectorRef,
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	NgZone,
	OnDestroy,
	Output,
	ViewContainerRef
} from '@angular/core';
import { ScrollControlsComponent } from './components/scroll-controls/scroll-controls.component';
import { Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { PlatformBrowserService } from '../../modules/browser';
import {DestroySubscription} from "../../helpers/destroy-subscription";

@Directive({
	selector: '[appScrollControls]'
})
export class ScrollControlsDirective extends DestroySubscription
	implements OnDestroy, AfterViewInit {
	private ref: ComponentRef<ScrollControlsComponent> | null = null;
	private readonly step = 150;

	@Input() set appScrollControls(val: boolean) {
		this.showControls = val;
		this.checkWidth();
	}

	@Input() compareByChildWidth = false;
	@Input() childMarginWidth = 0;
	@Output() scrollPos = new EventEmitter<number>();

	private showControls = true;
	private elementObserver: ResizeObserver | null;
	private parentObserver: ResizeObserver | null;
	private resized$ = new Subject();

	private get parent(): HTMLElement | null {
		const elRef = this.elRef;
		if (!elRef) {
			return null;
		}
		return elRef.nativeElement.parentElement || null;
	}

	private get elementWidth(): number | null {
		const elRef = this.elRef;
		if (!elRef) {
			return null;
		}
		return elRef.nativeElement.offsetWidth;
	}

	private get childrenWidth(): number | null {
		const elRef = this.elRef;
		if (!elRef) {
			return null;
		}
		const children = Array.from(elRef.nativeElement.children);

		// @ts-ignore
		return children.reduce((acc, curr: HTMLElement, index) => {
			const margin = index < children.length - 1 ? this.childMarginWidth : 0;
			const width = Math.floor(curr.getBoundingClientRect().width) || 0;
			acc += width + margin;
			return acc;
		}, 0);
	}

	constructor(
		private readonly vcr: ViewContainerRef,
		private readonly resolver: ComponentFactoryResolver,
		private readonly elRef: ElementRef<HTMLElement>,
		private readonly platformBrowserService: PlatformBrowserService,
		private readonly cdr: ChangeDetectorRef,
		private readonly zone: NgZone
	) {
		super();
	}

	ngAfterViewInit(): void {
		const elRef = this.elRef.nativeElement;
		if (!elRef) {
			return;
		}
		this.zone.runOutsideAngular(() => {
			this.elementObserver = this.addResizeObserver(elRef);
			const parent = this.parent;
			if (!parent) {
				return;
			}
			this.parentObserver = this.addResizeObserver(parent);
		});
		this.onResize();
	}

	public checkWidth(): void {
		if (!this.showControls) {
			return;
		}
		const parentWidth = this.parent ? this.parent.offsetWidth : null;
		const elementWidth = this.compareByChildWidth ? this.childrenWidth : this.elementWidth;
		if (parentWidth === null || elementWidth === null) {
			return;
		}
		if (parentWidth < elementWidth) {
			this.initComponent();
		} else {
			this.destroyComponent();
		}
	}

	// @ts-ignore
	ngOnDestroy(): void {
		this.destroyComponent();
		if (this.elementObserver) {
			this.elementObserver.disconnect();
			this.elementObserver = null;
		}
		if (this.parentObserver) {
			this.parentObserver.disconnect();
			this.parentObserver = null;
		}
		this.resized$.complete();
	}

	public moveRight(): void {
		const parent = this.parent;
		if (!parent) {
			return;
		}
		this.scrollTo(parent.scrollLeft + this.step);
	}

	public moveLeft(): void {
		const parent = this.parent;
		if (!parent) {
			return;
		}
		this.scrollTo(parent.scrollLeft - this.step);
	}

	private initComponent(): void {
		const ref = this.ref;
		if (!ref) {
			const factory = this.resolver.resolveComponentFactory(ScrollControlsComponent);
			this.ref = this.vcr.createComponent(factory);
			this.ref.instance.scroll$.pipe(takeUntil(this.destroyStream$)).subscribe(event => {
				event === 'left' ? this.moveLeft() : this.moveRight();
			});
		}
	}

	private scrollTo(left: number): void {
		const parent = this.parent;
		if (!parent) {
			return;
		}
		parent.scrollTo({ left, behavior: 'smooth' });
		this.scrollPos.emit(left);
	}

	private destroyComponent(): void {
		const ref = this.ref;
		if (ref) {
			ref.destroy();
			this.ref = null;
		}
	}

	private addResizeObserver(target: HTMLElement): ResizeObserver | null {
		if (!this.platformBrowserService.isBrowser) {
			return null;
		}
		if (!(window as any).ResizeObserver) {
			return null;
		}
		const observer = new ResizeObserver(() => {
			// @ts-ignore
			this.resized$.next();
		});
		observer.observe(target);
		return observer;
	}

	private onResize() {
		this.resized$
			.asObservable()
			.pipe(
				startWith(null),
				debounceTime(100),
				takeUntil(this.destroyStream$)
			)
			.subscribe(() => {
				this.checkWidth();
				this.cdr.detectChanges();
			});
	}

	public updateScroll() {
		// @ts-ignore
		this.resized$.next();
	}
}
