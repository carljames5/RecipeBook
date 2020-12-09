import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { finalize, mergeMap } from 'rxjs/operators';

import { AuthorizedUserService } from './authorized-user.service';
import { AppCacheStorageService } from './app-cache-storage.service';
import { AuthorizedUserHttpService } from './authorized-user-http.service';
import { CoreAuthenticationHttpService } from './core-authentication-http.service';
import { LoadingSpinnerService } from '../../shared/utilities/loading-spinner/services/loading-spinner.service';

import { CACHE_STORAGE_KEYS } from '../constants/app-cache-storage-service/app-cache-storage-service.constants';

import { AuthorizedUserDataModel } from 'src/app/shared/models/user/authorized-user-data.model';
import { CacheStorageSaveOptions } from '../models/app-cache-storage-service/cache-storage-save-options.model';
import { SignInRequestModel } from 'src/app/modules/authentication/models/request-models/sign-in-request.model';

@Injectable({
  providedIn: 'root',
})
export class CoreAuthenticationService {
  public constructor(
    private router: Router,
    private appCacheService: AppCacheStorageService,
    private authorizedUserService: AuthorizedUserService,
    private loadingSpinnerService: LoadingSpinnerService,
    private authorizedUserHttpService: AuthorizedUserHttpService,
    private coreAuthenticationHttpService: CoreAuthenticationHttpService
  ) {}

  public signIn(requestModel: SignInRequestModel) {
    this.loadingSpinnerService.show('Sign in...');

    this.coreAuthenticationHttpService
      .signIn(requestModel)
      .pipe(
        mergeMap(() => this.authorizedUserHttpService.getAuthorizedUserData()),
        finalize(() => this.loadingSpinnerService.hide())
      )
      .subscribe((response: AuthorizedUserDataModel) => {
        let cacheSaveOptionsItems: CacheStorageSaveOptions[] = [
          {
            data: true,
            storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
          },
          { data: response, storageKey: CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA'] },
        ];

        this.appCacheService.setMoreItem(cacheSaveOptionsItems);

        this.router.navigate(['/']);
      });
  }

  public signOut() {
    this.coreAuthenticationHttpService.signOut().subscribe(() => {
      const cacheSaveOptionsItem: CacheStorageSaveOptions = {
        data: false,
        storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
      };

      this.appCacheService.setItem(cacheSaveOptionsItem);
      this.appCacheService.removeItem(CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA']);

      this.authorizedUserService.setUserIsSignedIn(false);

      this.router.navigate(['/sign-in']);
    });
  }
}
