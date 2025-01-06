import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Column } from './'
import BoardContext from '../../../context/board'
import { emptyContext, fullContext } from '../../../../testsSetup'
import { KanbanBoard } from '../KanbanBoard'

describe('Column component', () => {
    it('renders Spinner when columns, column, columnTasks, or tasksInitial is falsy', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={emptyContext}>
                <Column
                    column={undefined}
                    columnTasks={[undefined]}
                    index={0}
                />
            </BoardContext.Provider>
        )

        expect(getByTestId('spinner')).toBeInTheDocument()
    })

    it('renders Column component with tasks', () => {
        const column = fullContext.columns[0]
        const allTasks = fullContext.tasks
        const columnTasks = column.taskIds.map((taskId: string) =>
            allTasks.find((el) => el.id === taskId)
        )

        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Column
                        column={column}
                        columnTasks={columnTasks}
                        index={0}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        expect(getByTestId(`column-header-${column.id}`)).toBeInTheDocument()
        expect(getByTestId(`task-list-${column.id}`)).toBeInTheDocument()
    })

    it('renders tasks in TasksList correctly', () => {
        const column = fullContext.columns[0]
        const allTasks = fullContext.tasks
        const columnTasks = column.taskIds.map((taskId: string) =>
            allTasks.find((el) => el.id === taskId)
        )

        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Column
                        column={column}
                        columnTasks={columnTasks}
                        index={0}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        const column1 = getByTestId(`task-list-${fullContext.columns[0].id}`)
        const column2 = getByTestId(`task-list-${fullContext.columns[1].id}`)
        const column3 = getByTestId(`task-list-${fullContext.columns[2].id}`)

        expect(column1.children).toHaveLength(2)
        expect(column2.children).toHaveLength(1)
        expect(column3.children).toHaveLength(1)
    })

    // TODO: Test creating new task
    // it('creates new task and shows textarea when + icon is clicked', async () => {
    //     const column = fullContext.columns[0]
    //     const allTasks = fullContext.tasks
    //     const columnTasks = column.taskIds.map((taskId: string) =>
    //         allTasks.find((el) => el.id === taskId)
    //     )

    //     const { getByTestId } = render(
    //         <BoardContext.Provider value={fullContext}>
    //             <KanbanBoard>
    //                 <Column
    //                     column={column}
    //                     columnTasks={columnTasks}
    //                     index={0}
    //                 />
    //             </KanbanBoard>
    //         </BoardContext.Provider>
    //     )

    //     const createTaskIcon = getByTestId(
    //         `column-header-create-task-${column.id}`
    //     )

    //     await waitFor(() => {
    //         fireEvent.click(createTaskIcon)
    //     })
    //     expect(getByTestId('textarea')).toBeInTheDocument()
    //     screen.debug()
    // })
})
