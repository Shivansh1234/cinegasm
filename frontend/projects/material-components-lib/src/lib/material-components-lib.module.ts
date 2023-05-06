import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsLibComponent } from './material-components-lib.component';
import { GridComponent } from './components/grid/grid.component';
import { PaginationComponent } from './components/pagination/pagination.component';

// Material imports
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MaterialComponentsLibComponent,
    GridComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MaterialComponentsLibComponent,
    GridComponent,
    PaginationComponent
  ]
})
export class MaterialComponentsLibModule { }
