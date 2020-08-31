import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingListIngredient } from '../models/shopping-list.model';
import { SaveShoppingListIngredientsRequestModel } from '../models/request-models/save-shopping-list-ingredients-request.model';
import { FetchShoppingListIngredientsResponseModels } from '../models/response-models/fetch-shopping-list-ingredients-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListHttpService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/ShoppingList`;
  }

  public saveShoppingList(shoppingListIngredients: ShoppingListIngredient[]): Observable<any> {
    const requestUrl: string = `${this._baseUrl}/SaveShoppingList`;
    const requestModel: SaveShoppingListIngredientsRequestModel = {} as SaveShoppingListIngredientsRequestModel;
    requestModel.shoppingListIngredientListItems = shoppingListIngredients;

    return this.http.post<SaveShoppingListIngredientsRequestModel>(requestUrl, requestModel);
  }

  public fetchShoppingListIngredients(): Observable<FetchShoppingListIngredientsResponseModels> {
    const requestUrl: string = `${this._baseUrl}/FetchShoppingList`;

    return this.http.get<FetchShoppingListIngredientsResponseModels>(requestUrl);
  }
}
