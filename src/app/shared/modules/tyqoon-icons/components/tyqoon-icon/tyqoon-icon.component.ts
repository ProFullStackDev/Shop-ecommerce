import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  Input,
  ElementRef,
  Optional,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';

import { TyqoonIconColor, tyqoonIconColorList } from '../../models/tyqoon-icon';
import { TyqoonIconRegistryService } from '../../services/tyqoon-icon-registry.service';

@Component({
  selector: 'app-tyqoon-icon',
  templateUrl: './tyqoon-icon.component.html',
  styleUrls: ['./tyqoon-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TyqoonIconComponent implements OnInit {
  private svgIcon: SVGElement;
  private iconName: string;
  private iconColor: TyqoonIconColor;
  private strokeColor: TyqoonIconColor;
  private pathColor: TyqoonIconColor;
  private iconWidth: string | number;
  private iconHeight: string | number;
  private mouseover: boolean;

  @Input()
  set name(iconName: string) {
    if (iconName === this.iconName) {
      return;
    }
    this.iconName = iconName;
    if (this.svgIcon) {
      this.elementRef.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.tyqoonIconRegistryService.getIcon(iconName);
    if (!svgData) {
      return;
    }
    this.svgIcon = this.svgElementFromString(svgData);
    if (this.iconColor) {
      this.svgIcon.style.fill = this.findColor(this.iconColor);
    }
    if (this.strokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.strokeColor);
    }
    if (this.iconWidth) {
      this.svgIcon.setAttribute('width', `${this.iconWidth}px`);
    }
    if (this.iconHeight) {
      this.svgIcon.setAttribute('height', `${this.iconHeight}px`);
    }
    this.elementRef.nativeElement.appendChild(this.svgIcon);
  }

  @Input()
  set color(color: TyqoonIconColor) {
    this.iconColor = color;
    if (this.svgIcon && color) {
      this.svgIcon.setAttribute('fill', this.findColor(color));
    }
  }

  @Input()
  set strokedColor(color: TyqoonIconColor) {
    this.strokeColor = color;
    if (this.svgIcon && color) {
      this.svgIcon.setAttribute('stroke', this.findColor(color));
    }
  }

  @Input()
  set pathsFillColor(color: TyqoonIconColor) {
    this.pathColor = color;
    const svg = this.svgIcon;
    if (svg && color) {
      this.fillPaths(svg, color);
    }
  }

  @Input()
  set pathsStrokeColor(color: TyqoonIconColor) {
    this.pathColor = color;
    const svg = this.svgIcon;
    if (svg && color) {
      this.strokePaths(svg, color);
    }
  }

  @Input()
  set circleStrokeColor(color: TyqoonIconColor) {
    this.pathColor = color;
    const svg = this.svgIcon;
    if (svg && color) {
      this.strokeCircles(svg, color);
    }
  }

  @Input()
  set circleFillColor(color: TyqoonIconColor) {
    this.pathColor = color;
    const svg = this.svgIcon;
    if (svg && color) {
      this.fillCircles(svg, color);
    }
  }

  @Input() set width(val: string | number) {
    this.iconWidth = val;
    if (this.svgIcon && val) {
      this.svgIcon.setAttribute('width', `${val}px`);
    }
  }

  @Input() set height(val: string | number) {
    this.iconHeight = val;
    if (this.svgIcon && val) {
      this.svgIcon.setAttribute('height', `${val}px`);
    }
  }

  @Input() hoverColor: TyqoonIconColor;
  @Input() hoverStrokeColor: TyqoonIconColor;

  @HostListener('mouseover')
  onMouseOver(): void {
    if (this.mouseover) {
      return;
    }
    this.mouseover = true;
    if (this.hoverColor) {
      this.svgIcon.style.fill = this.findColor(this.hoverColor);
    }
    if (this.hoverStrokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.hoverStrokeColor);
    }
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    if (!this.mouseover) {
      return;
    }
    this.mouseover = false;
    if (this.hoverColor) {
      this.svgIcon.style.fill = this.findColor(this.iconColor);
    }
    if (this.strokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.strokeColor);
    }
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly tyqoonIconRegistryService: TyqoonIconRegistryService,
    @Optional() @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {}

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }

  private findColor(color: TyqoonIconColor): string {
    const selectedColor = tyqoonIconColorList.find(item => item.name === color);
    if (!selectedColor) {
      return '#ffffff';
    }
    return selectedColor.color;
  }

  private fillCircles(svg: SVGElement, color: TyqoonIconColor): void {
    const circles = svg?.querySelectorAll('circle');
    if (!circles || !circles.length) {
      return;
    }
    Array.from(circles).forEach(item => {
      item.setAttribute('fill', this.findColor(color));
    });
  }

  private fillPaths(svg: SVGElement, color: TyqoonIconColor): void {
    const paths = svg?.querySelectorAll('path');
    if (!paths || !paths.length) {
      return;
    }
    Array.from(paths).forEach(item => {
      item.setAttribute('fill', this.findColor(color));
    });
  }

  private strokeCircles(svg: SVGElement, color: TyqoonIconColor): void {
    const circles = svg?.querySelectorAll('circle');
    if (!circles || !circles.length) {
      return;
    }
    Array.from(circles).forEach(item => {
      item.setAttribute('stroke', this.findColor(color));
    });
  }

  private strokePaths(svg: SVGElement, color: TyqoonIconColor): void {
    const paths = svg?.querySelectorAll('path');
    if (!paths || !paths.length) {
      return;
    }
    Array.from(paths).forEach(item => {
      item.setAttribute('stroke', this.findColor(color));
    });
  }
}
