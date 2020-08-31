import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DropDownDirective } from './directives/dropdown.directive';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './containers/nav-bar/nav-bar.component';
import { FooterComponent } from './containers/footer/footer.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, DropDownDirective],
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HttpClientModule, FontAwesomeModule],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    DropDownDirective,
    FontAwesomeModule,
    NavBarComponent,
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
