import { Component, OnInit, Input } from '@angular/core';

import { faTasks, faPlusSquare, faCogs, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../recipe.model';

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

  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }
}
