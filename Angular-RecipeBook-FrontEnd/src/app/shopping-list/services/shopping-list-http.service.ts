import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConsts } from 'src/app/shared/consts/api.const';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingListIngredientListItemResponseModel } from '../models/response-models/shopping-list-ingredient-list-item-response.model';
import { ShoppingListIngredient } from '../models/shopping-list.model';
import { SaveShoppingListIngredientListRequestModel } from '../models/request-models/save-shopping-list-ingredient-list-request.model';

@Injectable()
export class ShoppingListHttpService {
  constructor(private http: HttpClient) {}

  public saveShoppingList(shoppingListIngredients: ShoppingListIngredient[]): Observable<any> {
    const requestModel: SaveShoppingListIngredientListRequestModel = {} as SaveShoppingListIngredientListRequestModel;
    requestModel.shoppingListIngredientListItems = shoppingListIngredients;

    return this.http.post<SaveShoppingListIngredientListRequestModel>(
      ApiConsts.API_URL + '/api/ShoppingList/SaveShoppingList',
      requestModel
    );
  }

  public fetchShoppingListIngredients(): Observable<ShoppingListIngredientListItemResponseModel[]> {
    return this.http.get<ShoppingListIngredientListItemResponseModel[]>(
      ApiConsts.API_URL + '/api/ShoppingList/FetchShoppingList'
    );
  }
}
