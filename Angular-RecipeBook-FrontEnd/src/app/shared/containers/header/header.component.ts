import { Observable } from 'rxjs';
import { Component, OnInit, Output } from '@angular/core';

import { AppHeaderService } from 'src/app/core/services/app-header.service';
import { AuthorizedUserService } from 'src/app/core/services/authorized-user.service';
import { CoreAuthenticationService } from 'src/app/core/services/core-authentication.service';

import { AuthorizedUserDataModel } from '../../models/user/authorized-user-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public authorizedUserData: AuthorizedUserDataModel;

  //#region GETTERS

  public get authorizedUserData$(): Observable<AuthorizedUserDataModel> {
    return this.authorizedUserService.authorizedUserDataFromCache;
  }

  public get subTitle$(): Observable<string> {
    return this.appHeaderService.subTitle$;
  }

  public get mainTitle$(): Observable<string> {
    return this.appHeaderService.mainTitle$;
  }

  //#endregion

  public constructor(
    private appHeaderService: AppHeaderService,
    private authorizedUserService: AuthorizedUserService,
    private coreAuthenticationService: CoreAuthenticationService
  ) {}

  public ngOnInit(): void {
    this.authorizedUserData$.subscribe((response: AuthorizedUserDataModel) => {
      this.authorizedUserData = response;
    });
  }

  public onSignOut(): void {
    this.coreAuthenticationService.signOut();
  }
}
