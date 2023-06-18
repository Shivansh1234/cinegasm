import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PageConfig } from '../../material-components-lib';

@Component({
  selector: 'lib-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  // Inputs
  @Input() showFirstLastButtons: boolean = false;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageConfig: PageConfig = {
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0
  };

  // Output
  @Output() pageChange: EventEmitter<PageConfig> = new EventEmitter();

  constructor() { }

  handlePageEvent(pageEvent: PageEvent): void {
    this.pageConfig = {
      pageIndex: pageEvent.pageIndex,
      pageSize: pageEvent.pageSize,
      totalCount: pageEvent.length
    };
    this.pageChange.emit(this.pageConfig);
  };

}
