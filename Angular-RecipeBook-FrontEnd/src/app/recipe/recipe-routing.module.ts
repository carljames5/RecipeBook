import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './containers/recipe.component';
import { DefaultRecipeComponent } from './containers/default-recipe/default-recipe.component';
import { RecipeCreateComponent } from './containers/recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './containers/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './containers/recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
