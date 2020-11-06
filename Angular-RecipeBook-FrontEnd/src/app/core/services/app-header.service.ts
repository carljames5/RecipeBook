import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppHeaderService {
  public subTitle$: Subject<string> = new Subject<string>();
  public mainTitle$: Subject<string> = new Subject<string>();

  public setSubTitle(subTitle: string) {
    this.subTitle$.next(subTitle);
  }

  public setMainTitle(mainTitle: string) {
    this.mainTitle$.next(mainTitle);
  }
}
