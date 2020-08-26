import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ApiConsts } from 'src/app/shared/consts/api.const';
import { RecipeNameIsExistRequestModel } from '../models/request-models/recipe-name-is-exist-request.model';
import { RecipeNameIsExistResponseModel } from '../models/response-models/recipe-name-is-exist-response.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';
import { GetRecipeByIdRequestModel } from '../models/request-models/get-recipe-by-id-request.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/get-recipe-by-id-response.model';
import { EditRecipeResponseModel } from '../models/response-models/edit-recipe-response.model';
import { EditRecipeRequestModel } from '../models/request-models/edit-recipe-request.model';
import { UpdateRecipeRequestModel } from '../models/request-models/update-recipe-request.model';
import { CreateRecipeRequestModel } from '../models/request-models/create-recipe-request.model';

@Injectable()
export class RecipeHttpService {
  constructor(private http: HttpClient) {}

  public getRecipeById(id: number): Observable<GetRecipeByIdResponseModel> {
    const requestModel: GetRecipeByIdRequestModel = {} as GetRecipeByIdRequestModel;
    requestModel.id = id;

    return this.http.post<GetRecipeByIdResponseModel>(ApiConsts.API_URL + '/api/Recipe/GetById', requestModel);
  }

  public getAllRecipe(): Observable<GetAllRecipeResponseModel> {
    return this.http.get<GetAllRecipeResponseModel>(ApiConsts.API_URL + '/api/Recipe/GetAll');
  }

  public createNewRecipe(recipe: CreateRecipeRequestModel): Observable<Object> {
    return this.http.post(ApiConsts.API_URL + '/api/Recipe/Create', recipe);
  }

  public editRecipe(id: number): Observable<EditRecipeResponseModel> {
    const requestModel: EditRecipeRequestModel = {} as EditRecipeRequestModel;
    requestModel.id = id;

    return this.http.post<EditRecipeResponseModel>(ApiConsts.API_URL + '/api/Recipe/Edit', requestModel);
  }

  public updateRecipe(requestModel: UpdateRecipeRequestModel): Observable<Object> {
    return this.http.put(ApiConsts.API_URL + '/api/Recipe/Update', requestModel);
  }

  public deleteRecipe(id: number): Observable<Object> {
    let searchParamteres = new HttpParams();
    searchParamteres = searchParamteres.append('id', id.toString());

    return this.http.delete(ApiConsts.API_URL + '/api/Recipe/Delete', {
      params: searchParamteres,
    });
  }

  public checkRecipeNameIsExist(recipeId: number, recipeName: string) {
    const requestModel: RecipeNameIsExistRequestModel = {} as RecipeNameIsExistRequestModel;
    requestModel.recipeId = recipeId ?? 0;
    requestModel.recipeName = recipeName;

    return this.http.post<RecipeNameIsExistResponseModel>(
      ApiConsts.API_URL + '/api/Recipe/RecipeNameIsExist',
      requestModel
    );
  }
}
