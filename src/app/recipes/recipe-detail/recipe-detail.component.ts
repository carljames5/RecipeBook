import { Component, OnInit } from '@angular/core';

import { faTasks, faPlusSquare, faCogs, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  tasksIcon: IconDefinition = faTasks;
  plusSquareIcon: IconDefinition = faPlusSquare;
  cogsIcon: IconDefinition = faCogs;
  trashAltIcon: IconDefinition = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }
}
