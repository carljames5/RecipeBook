import { NgModule } from '@angular/core';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCogs,
  faEraser,
  faPlus,
  faPlusSquare,
  faRedoAlt,
  faSave,
  faSyncAlt,
  faTasks,
  faTrashAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPlus,
      faSave,
      faRedoAlt,
      faTrashAlt,
      faTasks,
      faPlusSquare,
      faCogs,
      faEraser,
      faSyncAlt,
      faSignInAlt
    );
  }
}
