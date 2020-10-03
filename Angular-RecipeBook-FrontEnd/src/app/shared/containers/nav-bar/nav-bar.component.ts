import { Component } from '@angular/core';
import { CoreAuthenticationService } from 'src/app/core/services/core-authentication.service';

import { ShoppingListService } from 'src/app/modules/shopping-list/services/shopping-list.service';
import { faSignOutAlt, faSignInAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/modules/authentication/services/authentication.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public isExpanded: boolean = false;
  public signInIcon: IconDefinition = faSignInAlt;

  //#region GETTERS

  public get userIsSignedIn(): boolean {
    return this.coreAuthenticationService.userIsSignedInFromLocaleStorage;
  }

  //#endregion

  constructor(
    private shoppingListService: ShoppingListService,
    private coreAuthenticationService: CoreAuthenticationService,
    private authenticationService: AuthenticationService
  ) {}

  public collapse(): void {
    this.isExpanded = false;
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public onFetchLastSavedShoppingList(): void {
    this.shoppingListService.getLastSavedShoppingList();
  }

  public onSaveShoppingList(): void {
    this.shoppingListService.saveShoppingList();
  }

  public onSignOut(): void {
    this.authenticationService.signOut();
  }
}
