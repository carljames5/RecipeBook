import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';

import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() public subTitle$: Observable<string>;
  @Input() public mainTitle$: Observable<string>;

  public constructor(private authenticationService: AuthenticationService) {}

  public onSignOut(): void {
    this.authenticationService.signOut();
  }
}
