import { NgModule } from '@angular/core';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipesComponent } from './container/recipe.component';
import { RecipeListComponent } from './container/components/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './container/components/recipe-list/recipe-item/recipe-item.component';
import { DefaultRecipeComponent } from './container/components/default-recipe/default-recipe.component';
import { RecipeCreateComponent } from './container/components/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './container/components/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './container/components/recipe-detail/recipe-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
