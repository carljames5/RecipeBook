import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { AppCacheStorageService } from './app-cache-storage.service';
import { AuthorizedUserHttpService } from './authorized-user-http.service';

import { CACHE_STORAGE_KEYS } from '../constants/app-cache-storage-service/app-cache-storage-service.constants';

import { AuthorizedUserDataModel } from 'src/app/shared/models/user/authorized-user-data.model';
import { CacheStorageSaveOptions } from '../models/app-cache-storage-service/cache-storage-save-options.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedUserService {
  public userIsSignedIn$: Subject<boolean> = new Subject<boolean>();

  //#region GETTERS

  public get userIsSignedIn(): Observable<boolean> {
    return this.authorizedUserHttpService.userIsSignedIn().pipe(
      tap(() => {
        const cacheStorageSaveOptionsItem: CacheStorageSaveOptions = {
          data: true,
          storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
        } as CacheStorageSaveOptions;

        this.appCacheService.setItem(cacheStorageSaveOptionsItem);

        this.setUserIsSignedIn(true);
      }),
      map(() => {
        return true;
      })
    );
  }

  public get userIsSignedInFromCache(): Observable<boolean> {
    const userIsSignedIn: boolean = this.appCacheService.getItemValue<boolean>(CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN']);

    if (userIsSignedIn === undefined || userIsSignedIn === null) {
      return this.authorizedUserHttpService.userIsSignedIn().pipe(
        tap(() => {
          const cacheStorageSaveOptionsItem: CacheStorageSaveOptions = {
            data: true,
            storageKey: CACHE_STORAGE_KEYS['USER_IS_SIGNED_IN'],
          } as CacheStorageSaveOptions;

          this.appCacheService.setItem(cacheStorageSaveOptionsItem);
        }),
        map(() => {
          return true;
        })
      );
    }

    return of<boolean>(userIsSignedIn);
  }

  public get authorizedUserDataFromCache(): Observable<AuthorizedUserDataModel> {
    const authorizedUserData: AuthorizedUserDataModel = this.appCacheService.getItemValue<AuthorizedUserDataModel>(
      CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA']
    );

    if (!authorizedUserData) {
      return this.authorizedUserHttpService.getAuthorizedUserData().pipe(
        tap((response: AuthorizedUserDataModel) => {
          const cacheSaveOptionsItem: CacheStorageSaveOptions = {
            data: response,
            storageKey: CACHE_STORAGE_KEYS['AUTHORIZED_USER_DATA'],
          } as CacheStorageSaveOptions;

          this.appCacheService.setItem(cacheSaveOptionsItem);
        }),
        map((response: AuthorizedUserDataModel) => {
          return response;
        })
      );
    }

    return of<AuthorizedUserDataModel>(authorizedUserData);
  }

  //#endregion

  constructor(
    private appCacheService: AppCacheStorageService,
    private authorizedUserHttpService: AuthorizedUserHttpService
  ) {}

  public setUserIsSignedIn(userIsSignedIn: boolean) {
    this.userIsSignedIn$.next(userIsSignedIn);
  }
}
