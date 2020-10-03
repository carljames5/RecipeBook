import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { SignedInGuard } from './core/guards/signed-in.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {
    path: 'sign-in',
    canActivate: [SignedInGuard],
    loadChildren: () => import('./modules/authentication/authentication.module').then(x => x.AuthenticationModule),
  },
  {
    path: 'recipe',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/recipe/recipe.module').then(x => x.RecipeModule),
  },
  {
    path: 'shopping-list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/shopping-list/shopping-list.module').then(x => x.ShoppingListModule),
  },
  { path: '**', redirectTo: 'recipe', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
