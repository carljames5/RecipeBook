import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationHttpService {
  private readonly _baseUrl: string;

  public constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/Authentication`;
  }

  public signOut(): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/SignOut`;

    return this.http.get(requestUrl);
  }

  public userIsSignedIn(): Observable<Object> {
    const requestUrl: string = `${this._baseUrl}/UserIsSignedIn`;

    return this.http.get(requestUrl);
  }
}
