import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleStorageService {
  public setItem<TValue>(key: string, value: TValue): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItemValue<TValue>(key: string): TValue {
    let parsedValue: TValue = JSON.parse(localStorage.getItem(key)) as TValue;

    if (parsedValue !== undefined && parsedValue !== null) {
      return parsedValue;
    }

    return null;
  }
}
