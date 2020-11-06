import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreAuthenticationService } from './core/services/core-authentication.service';
import { AppHeaderService } from './core/services/app-header.service';

import { LoadingSpinnerService } from './core/services/loading-spinner.service';
import { SidebarService } from './core/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  title: string = 'Angular-RecipeBook';

  //#region GETTERS

  public get sidebarIsVisible$(): Observable<boolean> {
    return this.sidebarService.isVisible$;
  }

  public get headerSubTitle$(): Observable<string> {
    return this.appHeaderService.subTitle$;
  }

  public get headerMainTitle$(): Observable<string> {
    return this.appHeaderService.mainTitle$;
  }

  public get loadingSpinnerMessage(): string {
    return this.loadingSpinnerService.message;
  }

  public get userIsSignedIn(): boolean {
    return this.coreAuthenticationService.userIsSignedInFromLocaleStorage;
  }

  //#endregion

  constructor(
    private sidebarService: SidebarService,
    private appHeaderService: AppHeaderService,
    private loadingSpinnerService: LoadingSpinnerService,
    private coreAuthenticationService: CoreAuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
