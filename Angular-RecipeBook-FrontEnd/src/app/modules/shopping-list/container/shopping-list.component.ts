import { Component, OnInit } from '@angular/core';
import { AppHeaderService } from 'src/app/shared/utilities/header/services/app-header.service';
import { MODULE_NAMES } from '../constants/module-names.constant';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  public constructor(private appHeaderService: AppHeaderService) {}

  public ngOnInit(): void {
    this.appHeaderService.setTitles(MODULE_NAMES['MAIN']);
  }
}
