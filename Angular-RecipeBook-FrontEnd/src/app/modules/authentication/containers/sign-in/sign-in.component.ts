import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CoreAuthenticationService } from 'src/app/core/services/core-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;

  public constructor(private coreAuthenticationService: CoreAuthenticationService) {}

  public ngOnInit(): void {
    this.signInForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      isPersistent: new FormControl(false),
    });
  }

  public onSignIn(): void {
    this.coreAuthenticationService.signIn(this.signInForm);
  }
}
