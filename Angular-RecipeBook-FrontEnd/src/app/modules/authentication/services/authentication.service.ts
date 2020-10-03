import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AuthenticationHttpService } from './authentication-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';

import { SignInRequestModel } from '../models/request-models/sign-in-request.model';
import { LocaleStorageService } from 'src/app/core/services/locale-storage.service';
import { LOCALE_SOTRAGE_KEYS } from 'src/app/core/constants/locale-storage-key.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(
    private authenticationHttpService: AuthenticationHttpService,
    private loadingSpinnerService: LoadingSpinnerService,
    private router: Router,
    private localStorageService: LocaleStorageService
  ) {}

  public signIn(signInFormValue: any) {
    const requestModel: SignInRequestModel = {
      userName: signInFormValue.get('userName').value,
      password: signInFormValue.get('password').value,
      isPersistent: signInFormValue.get('isPersistent').value,
    } as SignInRequestModel;

    this.loadingSpinnerService.show('Sign in...');

    this.authenticationHttpService
      .signIn(requestModel)
      .pipe(finalize(() => this.loadingSpinnerService.hide()))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public signOut() {
    this.loadingSpinnerService.show('Sign out...');

    this.authenticationHttpService
      .signOut()
      .pipe(
        finalize(() => {
          this.loadingSpinnerService.hide();
        })
      )
      .subscribe(() => {
        this.localStorageService.setItem<boolean>(LOCALE_SOTRAGE_KEYS['USER_IS_SIGNED_IN'], false);

        this.router.navigate(['/sign-in']);
      });
  }
}
