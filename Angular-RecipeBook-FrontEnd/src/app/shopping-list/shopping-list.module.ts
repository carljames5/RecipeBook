import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './containers/shopping-list.component';
import { ShoppingListIngredientEditComponent } from './containers/shopping-list-ingredient-edit/shopping-list-ingredient-edit.component';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListIngredientEditComponent],
  imports: [ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
