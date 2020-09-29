import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignInHttpService {
  private readonly _baseUrl: string;

  public constructor(private http: HttpClient) {
    this._baseUrl = `${environment.apiUrl}/Authentication`;
  }
}
