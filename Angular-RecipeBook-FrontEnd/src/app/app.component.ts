import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CoreAuthenticationService } from './core/services/core-authentication.service';

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

  public get loadingSpinnerMessage(): string {
    return this.loadingSpinnerService.message;
  }

  public get sidebarIsVisible$(): Observable<boolean> {
    return this.sidebarService.isVisible$;
  }

  public get userIsSignedIn(): boolean {
    return this.coreAuthenticationService.userIsSignedInFromLocaleStorage;
  }

  //#endregion

  constructor(
    private loadingSpinnerService: LoadingSpinnerService,
    private sidebarService: SidebarService,
    private coreAuthenticationService: CoreAuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
