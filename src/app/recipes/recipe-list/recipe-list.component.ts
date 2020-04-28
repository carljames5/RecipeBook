import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;

  @Output() onRecipeSelectedHandler = new EventEmitter<Recipe>();

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(recipe: Recipe) {
    this.onRecipeSelectedHandler.emit(recipe);
  }
}
