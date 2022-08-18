import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly localStorage = window.localStorage;

  public getItem<T>(key: string): T | null | undefined {
    try {
      const item = this.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : null;
    } catch (error) {
      return null;
    }
  }

  public setItem<T>(key: string, value: T): void {
    try {
      this.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return;
    }
  }

  public removeItem(key: string): void {
    try {
      this.localStorage.removeItem(key);
    } catch (error) {
      return;
    }
  }

  public clearStorage(): void {
    try {
      this.localStorage.clear();
    } catch (error) {
      return;
    }
  }
}
