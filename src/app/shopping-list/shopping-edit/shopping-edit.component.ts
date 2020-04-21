import { Component, OnInit } from '@angular/core';

import { faPlus, faTrashAlt, faSyncAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  trashIcon: IconDefinition = faTrashAlt;
  clearIcon: IconDefinition = faSyncAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
