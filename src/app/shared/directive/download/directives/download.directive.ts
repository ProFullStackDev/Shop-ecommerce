import {Directive, HostListener, Input} from '@angular/core';
import { Observable, Observer } from "rxjs";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";
import {takeUntil} from "rxjs/operators";

@Directive({
  selector: '[appDownload]'
})
export class DownloadDirective extends DestroySubscription {
  @Input() appDownload: string;
  base64Image: string;
  constructor() {
    super();
  }

  @HostListener('click', ['$event'])
  public onCopy(e: Event) {
    e.stopPropagation();
    if (!this.appDownload) {
      return;
    }

    this.downloadImage();
  }

  private downloadImage(): void {
    let imageUrl =
      this.appDownload;

    this.getBase64ImageFromURL(imageUrl).pipe(
      takeUntil(this.destroyStream$)
    ).subscribe((base64data: string) => {
      this.base64Image = "data:image/jpg;base64," + base64data;
      let link = document.createElement("a");

      document.body.appendChild(link);

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", "qr.png");
      link.click();
    });
  }

  private getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  private getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

}
