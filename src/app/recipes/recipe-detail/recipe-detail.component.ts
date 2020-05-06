import { Component, OnInit } from '@angular/core';

import { faTasks, faPlusSquare, faCogs, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

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

  recipe: Recipe;
  index: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipeById(+params['id']);
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
