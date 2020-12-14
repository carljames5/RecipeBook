import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderTitleDataModel } from 'src/app/core/models/routes/header-title-data.model';
import { RouterDataModel } from 'src/app/core/models/routes/router-data.model';
import { MODULE_NAMES } from './constants/module-names.constant';
import { ShoppingListComponent } from './container/shopping-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    data: {
      headerTitle: {
        mainTitle: MODULE_NAMES['MAIN'],
      } as HeaderTitleDataModel,
      browserTitle: { name: `${MODULE_NAMES['MAIN']}` },
    } as RouterDataModel,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
