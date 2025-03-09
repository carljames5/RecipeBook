import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { SignInRequestModel } from 'src/app/modules/authentication/models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationHttpService {
  private readonly _baseUrl: string;

  public constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/v1/Authentication`;
  }

  private getRequestUrl(endpoint: string): string {
    return `${this._baseUrl}/${endpoint}`;
  }

  public signIn(requestModel: SignInRequestModel): Observable<any> {
    const requestUrl: string = this.getRequestUrl('SignIn');
    return this.http.post<any>(requestUrl, requestModel);
  }

  public signOut(): Observable<any> {
    const requestUrl: string = this.getRequestUrl('SignOut');
    return this.http.get<any>(requestUrl);
  }
}