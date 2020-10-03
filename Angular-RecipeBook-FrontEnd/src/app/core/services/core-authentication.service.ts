import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { CoreAuthenticationHttpService } from './core-authentication-http.service';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationService {
  public constructor(private coreAuthenticationHttpService: CoreAuthenticationHttpService) {}

  public signOut() {
    this.coreAuthenticationHttpService.signOut().subscribe();
  }

  public get userIsSignedIn(): Observable<boolean> {
    return this.coreAuthenticationHttpService.userIsSignedIn().pipe(
      map(() => {
        return true;
      })
    );
  }
}
