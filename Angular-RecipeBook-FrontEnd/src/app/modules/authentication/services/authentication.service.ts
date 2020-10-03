import { Injectable } from '@angular/core';

import { AuthenticationHttpService } from './authentication-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';

import { SignInRequestModel } from '../models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public constructor(
    private authenticationHttpService: AuthenticationHttpService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  public signIn(signInFormValue: any) {
    const requestModel: SignInRequestModel = {
      userName: signInFormValue.get('userName').value,
      password: signInFormValue.get('password').value,
      isPersistent: signInFormValue.get('isPersistent').value,
    } as SignInRequestModel;

    this.authenticationHttpService.signIn(requestModel).subscribe(() => {});
  }
}
