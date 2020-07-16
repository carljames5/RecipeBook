import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms/';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListIngredientEditComponent } from './shopping-list/shopping-list-ingredient-edit/shopping-list-ingredient-edit.component';
import { FooterComponent } from './footer/footer.component';
import { DropDownDirective } from './shared/directives/dropdown.directive';
import { ShoppingListService } from './shopping-list/services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { DefaultRecipeComponent } from './recipes/default-recipe/default-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { RecipeService } from './recipes/services/recipe.service';
import { RecipeHttpService } from './recipes/services/recipe-http.service';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { ShoppingListHttpService } from './shopping-list/services/shopping-list-http.service';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingListIngredientEditComponent,
    FooterComponent,
    DropDownDirective,
    DefaultRecipeComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-full-width', closeButton: true }),
  ],
  providers: [ShoppingListService, RecipeService, RecipeHttpService, ShoppingListHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
