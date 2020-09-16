import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './container/recipe.component';
import { DefaultRecipeComponent } from './container/components/default-recipe/default-recipe.component';
import { RecipeCreateComponent } from './container/components/recipe-create/recipe-create.component';
import { RecipeDetailComponent } from './container/components/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './container/components/recipe-edit/recipe-edit.component';

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
