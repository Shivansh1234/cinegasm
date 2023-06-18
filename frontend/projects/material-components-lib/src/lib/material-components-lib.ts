export interface PageConfig {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
}

export interface ActionConfig {
    name: string;
    title: string;
    icon?: string;
    isGroupAction: boolean;
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

export interface ActionData {
    name: string;
    value: any[];
}
