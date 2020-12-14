import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private readonly _defaultMessage: string;

  public message$: Subject<string> = new Subject<string>();

  constructor(private spinner: NgxSpinnerService) {
    this._defaultMessage = 'Loading...';
  }

  public show(message: string = null) {
    this.message$.next(message ?? this._defaultMessage);

    this.spinner.show();
  }

  public hide() {
    this.spinner.hide();
  }
}
