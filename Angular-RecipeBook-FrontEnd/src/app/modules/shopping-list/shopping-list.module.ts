import { NgModule } from '@angular/core';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './container/shopping-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingListIngredientEditComponent } from './container/components/create-or-edit-shopping-list-ingredient/create-or-edit-shopping-list-ingredient.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListIngredientEditComponent],
  imports: [ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
