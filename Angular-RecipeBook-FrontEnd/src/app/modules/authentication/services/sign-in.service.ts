import { Injectable } from '@angular/core';

import { SignInHttpService } from './sign-in-http.service';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  public constructor(
    private signInHttpService: SignInHttpService,
    private loadingSpinnerService: LoadingSpinnerService
  ) {}
}
