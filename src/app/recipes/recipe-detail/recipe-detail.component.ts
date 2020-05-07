import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { faTasks, faPlusSquare, faCogs, faTrashAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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
              private route: ActivatedRoute,
              private router: Router) { }

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

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }
}
