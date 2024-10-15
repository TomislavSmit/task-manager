import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { KanbanBoard } from './'
import BoardContext from '../../../context/board'
import { emptyContext, fullContext } from '../../../../testsSetup'

describe('KanbanBoard', () => {
    test('returns null when tasks, columns, or columnOrder is null or undefined', () => {
        const { container } = render(
            <BoardContext.Provider value={emptyContext}>
                <KanbanBoard />
            </BoardContext.Provider>
        )

        expect(container).toBeEmptyDOMElement()
    })

    test('renders KanbanBoardContainer correctly', () => {
        const { container } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard />
            </BoardContext.Provider>
        )

        expect(container).toBeInTheDocument()
    })

    test('renders columns correctly', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard />
            </BoardContext.Provider>
        )

        expect(
            getByTestId('column-header-5e3e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f')
        ).toHaveTextContent('To do')
    })

    test('renders columnsList correctly', () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard />
            </BoardContext.Provider>
        )

        expect(
            getByTestId('column-header-5e3e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f')
        ).toBeInTheDocument()

        const columnTasks = getByTestId(
            'task-list-5e3e8b9e-7f7d-4a8a-9c7f-7a7f7a7f7a7f'
        )

        expect(columnTasks.children).toHaveLength(2)

        const tasksInFirstColumn = [fullContext.tasks[0], fullContext.tasks[1]]
        tasksInFirstColumn.forEach((task) => {
            const taskElement = getByTestId(`task-${task.id}`)

            expect(taskElement).toHaveTextContent(task.content)
        })
    })

    // TODO: Finish tests fro drag and drop
    // test('calls onDragEnd when a column is moved', async () => {})

    // test('calls onDragEnd when a task is moved within the same column', async () => {})

    // test('calls onDragEnd when a task is moved between columns', async () => {})
})
//
