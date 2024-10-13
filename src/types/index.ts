export interface ITask {
    id: string
    content: string
}

export interface IColumn {
    id: string
    title: string
    taskIds: string[]
    color: string
}

export interface IColumnOrder {
    [key: string]: string
}

export enum DroppableTypes {
    COLUMN = 'column',
    TASK = 'task',
}
