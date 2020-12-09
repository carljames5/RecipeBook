import { Observable } from 'rxjs';
import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { LoadingSpinnerService } from './shared/utilities/loading-spinner/services/loading-spinner.service';
import { AuthorizedUserService } from './core/services/authorized-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked, OnInit {
  title: string = 'Angular-RecipeBook';

  public userIsSignedIn: boolean;

  //#region GETTERS

  public get loadingSpinnerMessage(): string {
    return this.loadingSpinnerService.message;
  }

  public get userIsSignedIn$(): Observable<boolean> {
    return this.authorizedUserService.userIsSignedIn$;
  }

  //#endregion

  public constructor(
    private loadingSpinnerService: LoadingSpinnerService,
    private authorizedUserService: AuthorizedUserService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.userIsSignedIn$.subscribe(response => {
      this.userIsSignedIn = response;
    });
  }

  public ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
