import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'recipe',
    loadChildren: () => import('./modules/recipe/recipe.module').then(x => x.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(x => x.ShoppingListModule),
  },
  { path: '**', redirectTo: 'recipe', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
