import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipe/containers/recipe.component';
import { DefaultRecipeComponent } from './recipe/containers/default-recipe/default-recipe.component';
import { RecipeCreateComponent } from './recipe/containers/recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './recipe/containers/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/containers/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: DefaultRecipeComponent },
      { path: 'create', component: RecipeCreateComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
