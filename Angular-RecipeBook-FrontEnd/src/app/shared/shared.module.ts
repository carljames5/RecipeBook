import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './containers/nav-bar/nav-bar.component';
import { FooterComponent } from './containers/footer/footer.component';
import { DropDownDirective } from './directives/dropdown.directive';
import { FontAwesomeIconsModule } from './modules/fontawesome-icons.module';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, DropDownDirective],
  imports: [RouterModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    DropDownDirective,
    NavBarComponent,
    FooterComponent,
    FontAwesomeIconsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
