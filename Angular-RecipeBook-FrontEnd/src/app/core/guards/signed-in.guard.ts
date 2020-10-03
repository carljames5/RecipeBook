import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LocaleStorageService } from '../services/locale-storage.service';

import { LOCALE_SOTRAGE_KEYS } from '../constants/locale-storage-key.constants';

@Injectable({
  providedIn: 'root',
})
export class SignedInGuard implements CanActivate {
  constructor(private router: Router, private localeStorageService: LocaleStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userIsSignedIn: boolean = this.localeStorageService.getItemValue<boolean>(
      LOCALE_SOTRAGE_KEYS['USER_IS_LOGGED_IN']
    );

    if (userIsSignedIn) {
      this.router.navigate(['/']);

      return of(false);
    } else {
      return of(true);
    }
  }
}
