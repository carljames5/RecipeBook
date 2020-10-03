import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  private _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/Authentication`;
  }

  public get userIsLoggedIn(): Observable<boolean> {
    const requestUrl = `${this._baseUrl}/UserIsLoggedIn`;

    return this.http.get(requestUrl).pipe(
      map(() => {
        return true;
      })
    );
  }
}
