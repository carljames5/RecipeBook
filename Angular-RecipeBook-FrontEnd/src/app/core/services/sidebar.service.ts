import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public isVisible$: Subject<boolean> = new Subject<boolean>();

  public setSidebarVisibility(isVisible: boolean) {
    this.isVisible$.next(isVisible);
  }
}
