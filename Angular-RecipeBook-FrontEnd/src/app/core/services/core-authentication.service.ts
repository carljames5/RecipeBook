import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { LocaleStorageService } from './locale-storage.service';
import { CoreAuthenticationHttpService } from './core-authentication-http.service';

import { LOCALE_SOTRAGE_KEYS } from '../constants/locale-storage-key.constants';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationService {
  public constructor(
    private coreAuthenticationHttpService: CoreAuthenticationHttpService,
    private localStorageService: LocaleStorageService
  ) {}

  public signOut() {
    this.coreAuthenticationHttpService.signOut().subscribe(() => {
      this.localStorageService.setItem<boolean>(LOCALE_SOTRAGE_KEYS['USER_IS_LOGGED_IN'], false);
    });
  }

  public get userIsSignedIn(): Observable<boolean> {
    return this.coreAuthenticationHttpService.userIsSignedIn().pipe(
      tap(() => {
        console.log(LOCALE_SOTRAGE_KEYS['USER_IS_LOGGED_IN_KEY']);
        this.localStorageService.setItem<boolean>(LOCALE_SOTRAGE_KEYS['USER_IS_LOGGED_IN'], true);
      }),
      map(() => {
        return true;
      })
    );
  }
}
