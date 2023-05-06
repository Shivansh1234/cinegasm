export interface PageConfig {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
}

export interface ColumnConfig {
    name: string;
    header: string;
    type: string;
    sortable?: boolean;
}

export interface SelectionConfig {
    rows: any[];
    isChecked: boolean;
}
