import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConsts } from 'src/app/shared/consts/api.const';
import { SaveShoppingListRequestModel } from '../models/request-models/saveShoppingListRequestModel.model';
import { SaveShoppingListIngredientRequestModel } from '../models/request-models/saveShoppingListIngredientRequestModel.model';
import { Observable } from 'rxjs/internal/Observable';
import { FetchShoppingListIngredientListItemResponseModel } from '../models/response-models/fetch-shopping-list-ingredient-list-item-response.model';

@Injectable()
export class ShoppingListHttpService {
  constructor(private http: HttpClient) {}

  public saveShoppingList(shoppingListIngredients: SaveShoppingListIngredientRequestModel[]): Observable<any> {
    const requestModel = new SaveShoppingListRequestModel(shoppingListIngredients);

    return this.http.post(ApiConsts.API_URL + '/api/ShoppingList/SaveShoppingList', requestModel);
  }

  public fetchShoppingListIngredients(): Observable<FetchShoppingListIngredientListItemResponseModel[]> {
    return this.http.get<FetchShoppingListIngredientListItemResponseModel[]>(
      ApiConsts.API_URL + '/api/ShoppingList/FetchShoppingList'
    );
  }
}
