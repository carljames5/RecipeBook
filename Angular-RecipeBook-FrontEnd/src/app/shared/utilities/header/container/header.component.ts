import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';

import { AuthorizedUserService } from 'src/app/core/services/authorized-user.service';
import { CoreAuthenticationService } from 'src/app/core/services/core-authentication.service';
import { AppHeaderService } from 'src/app/shared/utilities/header/services/app-header.service';

import { HeaderTitleDataModel } from 'src/app/core/models/routes/header-title-data.model';
import { AuthorizedUserDataModel } from 'src/app/core/models/user/authorized-user-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Output() public authorizedUserData: AuthorizedUserDataModel;
  @Output() public titleData: HeaderTitleDataModel;

  //#region GETTERS

  public get authorizedUserData$(): Observable<AuthorizedUserDataModel> {
    return this.authorizedUserService.authorizedUserDataFromCache;
  }

  public get titleData$(): Observable<HeaderTitleDataModel> {
    return this.appHeaderService.titleData$;
  }

  //#endregion

  public constructor(
    private appHeaderService: AppHeaderService,
    private authorizedUserService: AuthorizedUserService,
    private coreAuthenticationService: CoreAuthenticationService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.authorizedUserData$.subscribe((response: AuthorizedUserDataModel) => {
        this.authorizedUserData = response;
      }),

      this.titleData$.subscribe((response: HeaderTitleDataModel) => {
        this.titleData = response;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  public onSignOut(): void {
    this.coreAuthenticationService.signOut();
  }
}
