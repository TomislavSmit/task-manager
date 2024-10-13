import { IColumn, ITask } from '../types'

const numberOfTasks = (column: IColumn, tasks: ITask[]) => {
    return column.taskIds.filter((columnTaskId) => {
        const keys = Object.values(tasks).map((task) => task.id)
        const num = keys.includes(columnTaskId)

        return num
    }).length
}

export { numberOfTasks }
