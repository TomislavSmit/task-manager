import { useContext } from 'react'
import BoardContext from '../../context/board'

import {
    ColumntListItem,
    Container,
    Title,
    TaskListItem,
} from './ListViewStyled'
import { numberOfTasks } from '../../utils/tasks'

const ListView = () => {
    const { tasks, columns, columnOrder } = useContext(BoardContext)

    if (!tasks || !columns || !columnOrder) {
        return null
    }

    return (
        <Container>
            {columnOrder.map((columnId) => {
                const column = columns.find((col) => col.id === columnId)

                if (!column) {
                    return null
                }

                const tasksList = column.taskIds.map((taskId) => {
                    return tasks.find((task) => task.id === taskId)
                })

                return (
                    <ColumntListItem key={columnId}>
                        <Title>
                            {column.title} ({numberOfTasks(column, tasks)})
                        </Title>

                        {column.taskIds.length === 0 && (
                            <p key={columnId}>No tasks</p>
                        )}

                        {tasksList.map((task) => {
                            return (
                                <TaskListItem key={task?.id}>
                                    {task?.content}
                                </TaskListItem>
                            )
                        })}
                    </ColumntListItem>
                )
            })}
        </Container>
    )
}

export default ListView
