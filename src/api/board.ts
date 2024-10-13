import { IColumn, IColumnOrder, ITask } from '../types'
import { apiClient } from './client'

export const fetchTasks = async (): Promise<ITask[]> => {
    const response = await apiClient.get<ITask[]>('tasks')

    return response.data
}

export const saveTaskToApi = async (task: ITask): Promise<void> => {
    await apiClient.post<ITask>('tasks', task)
}

export const updateTaskToApi = async (task: ITask): Promise<void> => {
    await apiClient.put<ITask>(`tasks/${task.id}`, task)
}

export const deleteTaskFromApi = async (task: string): Promise<void> => {
    await apiClient.delete<ITask>(`tasks/${task}`)
}

export const fetchColumns = async (): Promise<IColumn[]> => {
    const response = await apiClient.get<IColumn[]>('columns')

    return response.data
}

export const fetchColumnOrder = async (): Promise<IColumnOrder> => {
    const response = await apiClient.get<IColumnOrder>('columnOrder')

    return response.data
}

export const updateColumnsToApi = async (columns: IColumn[]): Promise<void> => {
    columns.map(async (column) => {
        await apiClient.put<IColumn>(`columns/${column.id}`, column)
    })
}

export const updateColumnToApi = async (column: IColumn): Promise<void> => {
    await apiClient.put<IColumn>(`columns/${column.id}`, column)
}

export const saveColumnOrderToApi = async (
    columnOrder: string[]
): Promise<void> => {
    // json-server requires endpoint values to be objects, so we transform the array into an object
    const columnOrderObject = Object.fromEntries(
        columnOrder.map((columnId) => [columnId, columnId])
    )

    await apiClient.put<IColumnOrder>('columnOrder', columnOrderObject)
}
