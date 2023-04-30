import { NgModule } from '@angular/core';
import { MaterialComponentsLibComponent } from './material-components-lib.component';
import { GridComponent } from './components/grid/grid.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    MaterialComponentsLibComponent,
    GridComponent,
    PaginationComponent
  ],
  imports: [
  ],
  exports: [
    MaterialComponentsLibComponent,
    GridComponent,
    PaginationComponent
  ]
})
export class MaterialComponentsLibModule { }
