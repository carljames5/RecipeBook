import { NgModule } from '@angular/core';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './container/shopping-list.component';
import { ShoppingListIngredientEditComponent } from './container/components/shopping-list-ingredient-edit/shopping-list-ingredient-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingListIngredientEditComponent],
  imports: [ShoppingListRoutingModule, SharedModule],
})
export class ShoppingListModule {}
