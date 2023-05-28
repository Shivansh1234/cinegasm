import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnConfig, PageConfig, SelectionConfig } from '../../material-components-lib';
import { SelectionModel } from '@angular/cdk/collections';
import { Sort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GridComponent implements OnInit {

  // Input
  @Input() gridColumns: ColumnConfig[] = [];
  @Input() gridData: any[] = [];
  @Input() isLoading: boolean = true;
  @Input() isSelectionEnabled: boolean = false;
  @Input() isIndexEnabled: boolean = true;
  @Input() isExpandableRowEnabled: boolean = false;
  @Input() expandableRowContentColumn: string = '';
  @Input() showFirstLastButtons: boolean = true;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @Input() pageConfig: PageConfig = {
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0
  };

  // Output
  @Output() pageChange: EventEmitter<PageConfig> = new EventEmitter();
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter();
  @Output() rowSelectionChange: EventEmitter<SelectionConfig> = new EventEmitter();

  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  displayedColumnsWithExpand: string[] = [];
  expandedRow: any;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    if (this.isSelectionEnabled) {
      this.displayedColumns.unshift('select');
    }
    if (this.isExpandableRowEnabled) {
      this.displayedColumns.push('expand');
    }
    if (this.isIndexEnabled) {
      if (this.isSelectionEnabled) {
        this.displayedColumns.splice(1, 0, 'index');
      } else {
        this.displayedColumns.unshift('index');
      }
    }
  }

  onPageChange(pageEvent: PageConfig): void {
    this.pageChange.emit(pageEvent);
  }

  getDisplayedColumns(): string[] {
    return this.gridColumns.map(c => c.name);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.gridData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterSelectToggle(event: any) {
    this.isAllSelected() ? this.selection.clear() : this.gridData.forEach((row) => this.selection.select(row));
    this.rowSelectionChange.emit({isChecked: event.checked, rows: this.selection.selected});
  }

  singleSelectToggle(event: any, row: any): void {
    this.selection.toggle(row);
    this.rowSelectionChange.emit({isChecked: event.checked, rows: this.selection.selected});
  }

  sortGridColumn(sort: Sort): void {
    this.sortChange.emit(sort);
  }
}
