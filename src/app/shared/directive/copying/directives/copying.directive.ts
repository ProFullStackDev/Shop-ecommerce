import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appCopying]'
})
export class CopyingDirective {
  @Input() appCopying: string | number | undefined;
  @Input() prefix = '';
  @Input() successTitle: string;
  @Output() copied = new EventEmitter<string>();

  constructor() {}

  @HostListener('click', ['$event'])
  public onCopy(e: Event) {
    e.stopPropagation();
    if (!this.appCopying) {
      return;
    }
    const textArea = document.createElement('textarea');
    textArea.value = `${this.prefix}${this.appCopying}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy'); // todo replace with better solution
    document.body.removeChild(textArea);

    this.copied.emit('COPIED!');

    const text = this.successTitle;
    setTimeout(() => this.copied.emit(text), 2000);
  }
}
