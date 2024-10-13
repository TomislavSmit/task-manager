import { useContext, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import BoardContext from '../../../context/board'
import { Task } from '../'
import {
    deleteTaskFromApi,
    updateColumnToApi,
    saveTaskToApi,
} from '../../../api/board'
import { numberOfTasks } from '../../../utils/tasks'
import { IColumn, ITask } from '../../../types'
import { Container, Header, PlusIcon, TasksList, Title } from './styled'
import { Spinner } from '../../UI'

const Column = ({
    column,
    columnTasks,
    index,
}: {
    column: IColumn | undefined
    // TODO: Check if this type is correct
    columnTasks: (ITask | undefined)[]
    index: number
}) => {
    const [creatingNewTaskId, setCreatingNewTaskId] = useState<string | null>(
        null
    )
    const {
        tasksInitial,
        setTasksInitial,
        tasks,
        columns,
        setColumns,
        setSearchTerm,
    } = useContext(BoardContext)

    console.count('rerendered Column component')

    if (!columns || !column || !columnTasks || !tasksInitial) {
        return <Spinner />
    }

    const deleteTask = async (id: string) => {
        // Remove tasks from tasks and save to api
        const tasksWithoutDeletedTask = tasksInitial.filter(
            (task) => task.id !== id
        )
        setTasksInitial(tasksWithoutDeletedTask)
        deleteTaskFromApi(id)

        // Remove task from column taskIds and save to api
        const currentColumn = columns.find((el) => el.id === column.id)
        if (!currentColumn) return
        const taskIdsWithoutDeletedTask = currentColumn.taskIds.filter(
            (taskId: string) => taskId !== id
        )
        const newColumns = columns.map((col) => {
            if (col.id === column.id) {
                return {
                    ...col,
                    taskIds: taskIdsWithoutDeletedTask,
                }
            }
            return col
        })
        const columnWithoutDeletedTask = {
            ...currentColumn,
            taskIds: taskIdsWithoutDeletedTask,
        }

        setColumns(newColumns)
        updateColumnToApi(columnWithoutDeletedTask)
    }

    const handleCreate = () => {
        const newId = uuidv4()
        console.log('creating new task...', newId)

        setCreatingNewTaskId(newId)
        setSearchTerm('')

        const newTask = {
            id: newId,
            content: '',
        }

        const newTasks = [...tasksInitial, newTask]

        const newColumn = columns.find((el) => el.id === column.id)
        if (!newColumn) return
        newColumn.taskIds.push(newId)

        setTasksInitial(newTasks)
        saveTaskToApi(newTask)
        updateColumnToApi(newColumn)
    }

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}>
                    <Header
                        $backgroundColor={column.color}
                        {...provided.dragHandleProps}
                    >
                        <Title {...provided.dragHandleProps}>
                            {column.title} (
                            {tasks && numberOfTasks(column, tasks)})
                        </Title>
                        <PlusIcon onClick={handleCreate}>+</PlusIcon>
                    </Header>
                    <Droppable droppableId={column.id}>
                        {(provided) => (
                            <TasksList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {columnTasks.map(
                                    (task, index) =>
                                        task && (
                                            <Task
                                                key={task.id}
                                                task={task}
                                                index={index}
                                                onDelete={deleteTask}
                                                creatingNewTaskId={
                                                    creatingNewTaskId
                                                }
                                            />
                                        )
                                )}
                                {provided.placeholder}
                            </TasksList>
                        )}
                    </Droppable>
                </Container>
            )}
        </Draggable>
    )
}

export { Column }
