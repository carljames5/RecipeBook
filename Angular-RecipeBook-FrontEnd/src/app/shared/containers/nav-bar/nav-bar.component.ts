import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppingListService } from 'src/app/modules/shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  private shoppingListSavedSubscription: Subscription;

  public isExpanded: boolean = false;

  constructor(private shoppingListService: ShoppingListService, private toastrService: ToastrService) {}

  public ngOnInit(): void {
    this.shoppingListSavedSubscription = this.shoppingListService.shoppingListSavedSubject.subscribe(() => {
      this.toastrService.success('Shopping list saved successfully!', null, {
        titleClass: 'title success',
      });
    });
  }

  public ngOnDestroy(): void {
    this.shoppingListSavedSubscription.unsubscribe();
  }

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
}
