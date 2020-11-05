import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { SidebarService } from './sidebar.service';
import { LocaleStorageService } from './locale-storage.service';
import { CoreAuthenticationHttpService } from './core-authentication-http.service';

import { LOCALE_SOTRAGE_KEYS } from '../constants/locale-storage-key.constants';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationService {
  public constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private localStorageService: LocaleStorageService,
    private coreAuthenticationHttpService: CoreAuthenticationHttpService
  ) {}

  public signOut() {
    this.coreAuthenticationHttpService.signOut().subscribe(() => {
      this.localStorageService.setItem<boolean>(LOCALE_SOTRAGE_KEYS['USER_IS_SIGNED_IN'], false);

      this.sidebarService.setSidebarVisibility(false);

      this.router.navigate(['/sign-in']);
    });
  }

  public get userIsSignedIn(): Observable<boolean> {
    return this.coreAuthenticationHttpService.userIsSignedIn().pipe(
      tap(() => {
        this.localStorageService.setItem<boolean>(LOCALE_SOTRAGE_KEYS['USER_IS_SIGNED_IN'], true);

        this.sidebarService.setSidebarVisibility(true);
      }),
      map(() => {
        return true;
      })
    );
  }

  public get userIsSignedInFromLocaleStorage(): boolean {
    const userIsLoggedIn = this.localStorageService.getItemValue<boolean>(LOCALE_SOTRAGE_KEYS['USER_IS_SIGNED_IN']);

    if (userIsLoggedIn) {
      return true;
    }

    return false;
  }
}
