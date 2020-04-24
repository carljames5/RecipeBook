import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular-RecipeBook';
  loadedMenu: string = 'recipes';

  onNavigate(selectedMenu: string) {
    this.loadedMenu = selectedMenu;
  }
}