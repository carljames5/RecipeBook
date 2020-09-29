import { Injectable } from '@angular/core';

import { SignInHttpService } from './sign-in-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';
import { SignInRequestModel } from '../models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  public constructor(
    private signInHttpService: SignInHttpService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}

  public signIn(signInFormValue: any) {
    const requestModel: SignInRequestModel = {
      userName: signInFormValue.get('userName').value,
      password: signInFormValue.get('password').value,
    };

    console.log(requestModel);
  }
}
