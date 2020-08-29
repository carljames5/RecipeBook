import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms/';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListIngredientEditComponent } from './shopping-list/shopping-list-ingredient-edit/shopping-list-ingredient-edit.component';
import { FooterComponent } from './footer/footer.component';
import { DropDownDirective } from './shared/directives/dropdown.directive';
import { ShoppingListService } from './shopping-list/services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';

import { LoadingComponent } from './shared/components/loading/loading.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingListHttpService } from './shopping-list/services/shopping-list-http.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListIngredientEditComponent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-full-width', closeButton: true }),
  ],
  providers: [ShoppingListService, ShoppingListHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
