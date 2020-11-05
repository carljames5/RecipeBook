import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

import {
  MODE_KEYS,
  DOCKED_SIZE,
  POSITION_KEYS,
  AUTO_COLLAPSE_WIDTH_SIZE,
} from 'src/app/shared/containers/sidebar/constants/sidebar.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() public isVisible$: Observable<boolean>;

  public isOpened: boolean;
  public isDocked: boolean;
  public isAnimate: boolean;

  public mode: string;
  public position: string;

  public dockedSize: string;
  public autoCollapseWidthSize: number;

  public constructor() {
    this.isOpened = false;

    this.mode = MODE_KEYS['PUSH'];
    this.position = POSITION_KEYS['LEFT'];

    this.dockedSize = DOCKED_SIZE;
    this.autoCollapseWidthSize = AUTO_COLLAPSE_WIDTH_SIZE;
  }

  public ngOnInit(): void {
    this.isVisible$.subscribe(isVisible => {
      this.setSidebarVisibility(isVisible);
    });
  }

  public onToggleSwitch(isOpened: boolean): void {
    this.isOpened = isOpened;
  }

  private setSidebarVisibility(isVisible: boolean) {
    if (isVisible) {
      this.isDocked = true;
      this.isAnimate = true;
    } else {
      this.isDocked = false;
      this.isAnimate = false;
      this.isOpened = false;
    }
  }
}
