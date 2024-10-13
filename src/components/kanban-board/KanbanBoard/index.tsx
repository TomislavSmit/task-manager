import { useContext } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import BoardContext from '../../../context/board'
import { Column } from '../Column'
import {
    saveColumnOrderToApi,
    updateColumnsToApi,
    updateColumnToApi,
} from '../../../api/board'
import { DroppableTypes, IColumn } from '../../../types'
import { Container } from './styled'

const KanbanBoard = () => {
    const { tasks, columns, setColumns, columnOrder, setColumnOrder } =
        useContext(BoardContext)

    if (!tasks || !columns || !columnOrder) {
        return null
    }

    // @ts-expect-error TODO: add type for 'result' parameter
    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result

        console.log('result onDragEnd', result)

        if (!destination) {
            return
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        if (type === DroppableTypes.COLUMN) {
            console.log('moving column...')

            const newColumnOrder = [...columnOrder]
            newColumnOrder.splice(source.index, 1)
            newColumnOrder.splice(destination.index, 0, draggableId)

            setColumnOrder(newColumnOrder)
            saveColumnOrderToApi(newColumnOrder)

            return
        }

        const startColumn = columns.find(
            (column) => column.id === source.droppableId
        )
        const finishColumn = columns.find(
            (column) => column.id === destination.droppableId
        )

        if (startColumn === undefined || finishColumn === undefined) {
            return
        }

        if (
            startColumn !== undefined &&
            finishColumn !== undefined &&
            startColumn.id === finishColumn.id
        ) {
            console.log('moving task in the same column...')

            const newTaskIds = [...startColumn.taskIds]
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...startColumn,
                taskIds: newTaskIds,
            }
            const newColumns = columns.map((col) => {
                if (col.id === newColumn.id) {
                    return newColumn
                }
                return col
            })

            setColumns(newColumns)
            updateColumnToApi(newColumn)

            return
        }

        console.log('moving task between columns...')

        const startColumnTaskIds = [...startColumn.taskIds]
        startColumnTaskIds.splice(source.index, 1)
        const newStartColumn = { ...startColumn, taskIds: startColumnTaskIds }

        const finishColumnTaskIds = [...finishColumn.taskIds]
        finishColumnTaskIds.splice(destination.index, 0, draggableId)
        const newFinishColumn = {
            ...finishColumn,
            taskIds: finishColumnTaskIds,
        }

        const newColumns = columns.map((col) => {
            if (col.id === newStartColumn.id) {
                return newStartColumn
            } else if (col.id === newFinishColumn.id) {
                return newFinishColumn
            }
            return col
        }) as IColumn[]

        setColumns(newColumns)
        updateColumnsToApi([newStartColumn, newFinishColumn])
    }

    const columnsList = columnOrder.map((columnId: string, index: number) => {
        const column = columns.find((el) => el.id === columnId)
        const columnTasks = column?.taskIds.map((taskId: string) =>
            tasks.find((el) => el.id === taskId)
        )

        if (!columnTasks || !column) {
            return null
        }
        return (
            <Column
                key={columnId}
                column={column}
                columnTasks={columnTasks}
                index={index}
            />
        )
    })

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId='board'
                direction='horizontal'
                type={DroppableTypes.COLUMN}
            >
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {columnsList}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export { KanbanBoard }
