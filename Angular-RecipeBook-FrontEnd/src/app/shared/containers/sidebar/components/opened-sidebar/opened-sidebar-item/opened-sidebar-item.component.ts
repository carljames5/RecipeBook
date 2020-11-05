import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { OpenedSidebarLinkItemModel } from '../../../models/opened-sidebar-link-item.model';
import { ROUTER_LINKS } from 'src/app/shared/containers/sidebar/constants/sidebar.constants';

@Component({
  selector: 'app-opened-sidebar-item',
  templateUrl: './opened-sidebar-item.component.html',
  styleUrls: ['./opened-sidebar-item.component.scss'],
})
export class OpenedSidebarItemComponent {
  @Input() public linkItem: OpenedSidebarLinkItemModel;

  public constructor(private router: Router) {}

  public onNavigation(linkTypeCode: number): void {
    this.router.navigate([ROUTER_LINKS[linkTypeCode]]);
  }
}
