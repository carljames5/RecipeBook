import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UpdateRecipeRequestModel } from '../models/request-models/updateRecipeRequestModel.model';
import { Observable } from 'rxjs/internal/Observable';
import { ApiConsts } from 'src/app/shared/consts/api.const';
import { RecipeNameIsExistRequestModel } from '../models/request-models/recipeNameIsExistRequestModel.model';
import { RecipeNameIsExistResponseModel } from '../models/response-models/recipeNameIsExistResponseModel.model';
import { CreateRecipeRequestModel } from '../models/request-models/createRecipeRequestModel.model';
import { GetRecipeByIdResponseModel } from '../models/response-models/getRecipeByIdResponseModel.model';
import { GetAllRecipeResponseModel } from '../models/response-models/get-all-recipe-response.model';

@Injectable()
export class RecipeHttpService {
  constructor(private http: HttpClient) {}

  public getRecipeById(id: number): Observable<GetRecipeByIdResponseModel> {
    let searchParamteres = new HttpParams();
    searchParamteres = searchParamteres.append('id', id.toString());

    return this.http.get<GetRecipeByIdResponseModel>(ApiConsts.API_URL + '/api/Recipe/GetById', {
      params: searchParamteres,
    });
  }

  public getAllRecipe(): Observable<GetAllRecipeResponseModel> {
    return this.http.get<GetAllRecipeResponseModel>(ApiConsts.API_URL + '/api/Recipe/GetAll');
  }

  public createNewRecipe(recipe: CreateRecipeRequestModel): Observable<Object> {
    return this.http.post(ApiConsts.API_URL + '/api/Recipe/Create', recipe);
  }

  public updateRecipe(recipe: UpdateRecipeRequestModel): Observable<Object> {
    return this.http.put(ApiConsts.API_URL + '/api/Recipe/Update', recipe);
  }

  public deleteRecipe(id: number): Observable<Object> {
    let searchParamteres = new HttpParams();
    searchParamteres = searchParamteres.append('id', id.toString());

    return this.http.delete(ApiConsts.API_URL + '/api/Recipe/Delete', {
      params: searchParamteres,
    });
  }

  public checkRecipeNameIsExist(model: RecipeNameIsExistRequestModel) {
    return this.http.post<RecipeNameIsExistResponseModel>(ApiConsts.API_URL + '/api/Recipe/RecipeNameIsExist', model);
  }
}
