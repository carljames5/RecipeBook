import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppHeaderService {
  public subTitle$: Subject<string> = new Subject<string>();
  public mainTitle$: Subject<string> = new Subject<string>();

  public setTitles(mainTitle: string, subTitle: string = null) {
    this.mainTitle$.next(mainTitle);
    this.subTitle$.next(subTitle);
  }
}
