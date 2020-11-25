import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from 'src/app/core/services/app-header.service';
import { MODULE_NAMES } from '../constants/module-names.constant';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  public constructor(private appHeaderService: AppHeaderService) {}

  public ngOnInit(): void {
    this.appHeaderService.subTitle$.next();
    this.appHeaderService.mainTitle$.next(MODULE_NAMES['MAIN']);
  }
}
