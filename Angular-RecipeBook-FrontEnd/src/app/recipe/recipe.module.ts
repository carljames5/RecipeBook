import { NgModule } from '@angular/core';

import { RecipesComponent } from './containers/recipe.component';
import { RecipeListComponent } from './containers/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './containers/recipe-list/recipe-item/recipe-item.component';
import { DefaultRecipeComponent } from './containers/default-recipe/default-recipe.component';
import { RecipeCreateComponent } from './containers/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './containers/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './containers/recipe-detail/recipe-detail.component';

import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    DefaultRecipeComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
  ],
  imports: [RecipeRoutingModule, SharedModule],
})
export class RecipeModule {}
