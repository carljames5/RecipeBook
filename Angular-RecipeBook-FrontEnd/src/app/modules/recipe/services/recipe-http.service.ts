import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { GetRecipeByIdResponseModel } from '../models/response-models/get-recipe-by-id-response.model';
import { GetRecipeByIdRequestModel } from '../models/request-models/get-recipe-by-id-request.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { CreateRecipeRequestModel } from '../models/request-models/create-recipe-request.model';
import { EditRecipeResponseModel } from '../models/response-models/edit-recipe-response.model';
import { EditRecipeRequestModel } from '../models/request-models/edit-recipe-request.model';
import { UpdateRecipeRequestModel } from '../models/request-models/update-recipe-request.model';
import { DeleteRecipeRequestModel } from '../models/request-models/delete-recipe-request.model';
import { RecipeNameIsExistRequestModel } from '../models/request-models/recipe-name-is-exist-request.model';
import { RecipeNameIsExistResponseModel } from '../models/response-models/recipe-name-is-exist-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttpService {
  private readonly _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/Recipe`;
  }

  public getRecipeById(id: number): Observable<GetRecipeByIdResponseModel> {
    const requestUrl: string = `${this._baseUrl}/GetById`;
    const requestModel: GetRecipeByIdRequestModel = {} as GetRecipeByIdRequestModel;
    requestModel.id = id;

    return this.http.post<GetRecipeByIdResponseModel>(requestUrl, requestModel);
  }

  public getAllRecipe(): Observable<GetAllRecipeResponseModel> {
    const requestUrl: string = `${this._baseUrl}/GetAll`;

    return this.http.get<GetAllRecipeResponseModel>(requestUrl);
  }

  public createNewRecipe(recipe: CreateRecipeRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/Create`;

    return this.http.post(requestUrl, recipe);
  }

  public editRecipe(id: number): Observable<EditRecipeResponseModel> {
    const requestUrl: string = `${this._baseUrl}/Edit`;
    const requestModel: EditRecipeRequestModel = {} as EditRecipeRequestModel;
    requestModel.id = id;

    return this.http.post<EditRecipeResponseModel>(requestUrl, requestModel);
  }

  public updateRecipe(requestModel: UpdateRecipeRequestModel): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/Update`;

    return this.http.put(requestUrl, requestModel);
  }

  public deleteRecipe(id: number): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/Delete`;
    const requestModel: DeleteRecipeRequestModel = {} as DeleteRecipeRequestModel;
    requestModel.id = id;

    return this.http.post(requestUrl, requestModel);
  }

  public checkRecipeNameIsExist(recipeId: number, recipeName: string) {
    const requestUrl: string = `${this._baseUrl}/RecipeNameIsExist`;
    const requestModel: RecipeNameIsExistRequestModel = {} as RecipeNameIsExistRequestModel;
    requestModel.recipeId = recipeId ?? 0;
    requestModel.recipeName = recipeName;

    return this.http.post<RecipeNameIsExistResponseModel>(requestUrl, requestModel);
  }
}
