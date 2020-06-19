import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public plusIcon: IconDefinition = faPlus;

  private recipesChangedSubscription: Subscription;

  public recipes: Recipe[];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.recipes = this.recipeService.getRecipes();
  }

  public ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
  }

  public onCreateRecipe() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
