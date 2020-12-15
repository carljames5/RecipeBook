import { Observable, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/internal/operators/filter';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthorizedUserService } from './core/services/authorized-user.service';
import { AppHeaderService } from './shared/utilities/header/services/app-header.service';

import { DEFAULT_BROWSER_TAB_TITLE } from './core/constants/browser-data/browser-data.constants';

import { RouterDataModel } from './core/models/routes/router-data.model';
import { HeaderTitleDataModel } from './core/models/routes/header-title-data.model';
import { BrowserTitleDataModel } from './core/models/routes/browser-title-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  //#region GETTERS

  public get userSignInState$(): Observable<boolean> {
    return this.authorizedUserService.userSignInState$;
  }

  //#endregion

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appHeaderService: AppHeaderService,
    private authorizedUserService: AuthorizedUserService,
    private titleService: Title
  ) {
    this.subscriptions.push(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        const activatedRoute = this.getActivatedRoute(this.activatedRoute);

        activatedRoute.data.subscribe((data: RouterDataModel) => {
          const headerTitleData: HeaderTitleDataModel = data.headerTitle;
          const browserTitleData: BrowserTitleDataModel = data.browserTitle;

          this.titleService.setTitle(browserTitleData?.name ?? DEFAULT_BROWSER_TAB_TITLE);

          if (headerTitleData) {
            this.appHeaderService.setTitleData(headerTitleData);
          }
        });
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  private getActivatedRoute(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getActivatedRoute(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
