import { Component } from '@angular/core';

import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public constructor(private authenticationService: AuthenticationService) {}

  public onSignOut(): void {
    this.authenticationService.signOut();
  }
}
