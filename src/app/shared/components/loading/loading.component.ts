import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() loadingClass: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.loadingClass) {
      this.loadingClass = 'default-loading';
    }
  }
}
