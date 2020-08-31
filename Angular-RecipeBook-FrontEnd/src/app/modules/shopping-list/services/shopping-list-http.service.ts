import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConsts } from 'src/app/shared/consts/api.const';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingListIngredient } from '../models/shopping-list.model';
import { SaveShoppingListIngredientsRequestModel } from '../models/request-models/save-shopping-list-ingredients-request.model';
import { FetchShoppingListIngredientsResponseModels } from '../models/response-models/fetch-shopping-list-ingredients-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListHttpService {
  constructor(private http: HttpClient) {}

  public saveShoppingList(shoppingListIngredients: ShoppingListIngredient[]): Observable<any> {
    const requestModel: SaveShoppingListIngredientsRequestModel = {} as SaveShoppingListIngredientsRequestModel;
    requestModel.shoppingListIngredientListItems = shoppingListIngredients;

    return this.http.post<SaveShoppingListIngredientsRequestModel>(
      ApiConsts.API_URL + '/api/ShoppingList/SaveShoppingList',
      requestModel
    );
  }

  public fetchShoppingListIngredients(): Observable<FetchShoppingListIngredientsResponseModels> {
    return this.http.get<FetchShoppingListIngredientsResponseModels>(
      ApiConsts.API_URL + '/api/ShoppingList/FetchShoppingList'
    );
  }
}
