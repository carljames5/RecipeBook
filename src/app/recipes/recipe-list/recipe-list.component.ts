import { Component, OnInit } from '@angular/core';

import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;

  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onCreateRecipe() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
