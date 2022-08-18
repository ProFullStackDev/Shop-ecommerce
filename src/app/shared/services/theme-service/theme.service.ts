import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeCheck$ = new BehaviorSubject(true);

  constructor(private readonly localStorageService: LocalStorageService, @Inject(DOCUMENT) private readonly document: Document) {}

  toggleTheme(e: Event): void {
    e.stopPropagation();

    if (this.localStorageService.getItem('theme') === 'theme-dark') {
      this.setTheme('theme-light');
      this.themeCheck$.next(false);
    } else {
      this.setTheme('theme-dark');
      this.themeCheck$.next(true);
    }
  }

  setTheme(themeName: string): void {
    this.localStorageService.setItem('theme', themeName);
    this.document.getElementsByTagName('html')[0].className = themeName;
  }

  defaultTheme(): void {
    if (this.localStorageService.getItem('theme') === 'theme-dark') {
      this.document.getElementsByTagName('html')[0].classList.remove('theme-light');
      this.document.getElementsByTagName('html')[0].classList.add('theme-dark');
      this.themeCheck$.next(true);
    } else {
      this.document.getElementsByTagName('html')[0].classList.remove('theme-dark');
      this.document.getElementsByTagName('html')[0].classList.add('theme-light');
      this.themeCheck$.next(false);
    }
  }
}
