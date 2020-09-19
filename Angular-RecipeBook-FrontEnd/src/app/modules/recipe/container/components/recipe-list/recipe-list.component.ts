import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeService } from '../../../services/recipe.service';
import { GetAllRecipeListItemResponseModel } from '../../../models/response-models/get-all-recipe-list-item-response.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipeItemsRefreshSubscription: Subscription;

  public recipes: GetAllRecipeListItemResponseModel[];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    this.recipeItemsRefreshSubscription = this.recipeService.refreshRecipeItemsSubject.subscribe(
      (recipeItems: GetAllRecipeListItemResponseModel[]) => {
        this.recipes = recipeItems;
      }
    );

    this.recipeService.refreshRecipeItems();
  }

  public ngOnDestroy() {
    this.recipeItemsRefreshSubscription.unsubscribe();
  }

  public onCreateRecipe() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
}
