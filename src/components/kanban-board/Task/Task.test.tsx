import { render, fireEvent } from '@testing-library/react'
import { Task } from './'
import BoardContext from '../../../context/board'
import { ITask } from '../../../types'
import { vi } from 'vitest'
import { emptyContext, fullContext } from '../../../../testsSetup'
import { KanbanBoard } from '../KanbanBoard'

describe('Task component', () => {
    const task: ITask = { id: 'task-1', content: 'Task content' }
    const onDelete = vi.fn()
    const creatingNewTaskId = null

    it('renders spinner when tasksInitial is null', async () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={emptyContext}>
                <Task
                    task={task}
                    index={0}
                    onDelete={onDelete}
                    creatingNewTaskId={creatingNewTaskId}
                />
            </BoardContext.Provider>
        )
        expect(getByTestId('spinner')).toBeInTheDocument()
    })

    it('renders task content when tasksInitial is not null', async () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Task
                        task={fullContext.tasks[0]}
                        index={0}
                        onDelete={onDelete}
                        creatingNewTaskId={creatingNewTaskId}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        expect(
            getByTestId(`task-${fullContext.tasks[0].id}`)
        ).toBeInTheDocument()
    })

    it('shows delete icon on mouse over', async () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Task
                        task={fullContext.tasks[0]}
                        index={0}
                        onDelete={onDelete}
                        creatingNewTaskId={creatingNewTaskId}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        const container = getByTestId(`task-${fullContext.tasks[0].id}`)
        fireEvent.mouseOver(container)
        expect(getByTestId('delete-icon')).toBeInTheDocument()
    })

    it('hides delete icon on mouse out', async () => {
        const { getByTestId, queryByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Task
                        task={fullContext.tasks[0]}
                        index={0}
                        onDelete={onDelete}
                        creatingNewTaskId={creatingNewTaskId}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        const container = getByTestId(`task-${fullContext.tasks[0].id}`)
        fireEvent.mouseOut(container)

        expect(queryByTestId('delete-icon')).not.toBeInTheDocument()
    })

    // it('calls onDelete when delete icon is clicked', async () => {})

    it('enters edit mode when double clicked', async () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Task
                        task={fullContext.tasks[0]}
                        index={0}
                        onDelete={onDelete}
                        creatingNewTaskId={creatingNewTaskId}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        const container = getByTestId(`task-${fullContext.tasks[0].id}`)
        fireEvent.doubleClick(container)
        expect(getByTestId('text-area')).toBeInTheDocument()
    })

    it('hides form when Enter key is pressed', async () => {
        const { getByTestId, queryByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Task
                        task={fullContext.tasks[0]}
                        index={0}
                        onDelete={onDelete}
                        creatingNewTaskId={creatingNewTaskId}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        const container = getByTestId(`task-${fullContext.tasks[0].id}`)
        fireEvent.doubleClick(container)
        const textarea = getByTestId('text-area')
        fireEvent.keyDown(textarea, { key: 'Enter' })

        expect(queryByTestId('text-area')).not.toBeInTheDocument()
    })

    it('exits edit mode when Escape key is pressed', async () => {
        const { getByTestId, queryByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <KanbanBoard>
                    <Task
                        task={fullContext.tasks[0]}
                        index={0}
                        onDelete={onDelete}
                        creatingNewTaskId={creatingNewTaskId}
                    />
                </KanbanBoard>
            </BoardContext.Provider>
        )

        const container = getByTestId(`task-${fullContext.tasks[0].id}`)
        fireEvent.doubleClick(container)
        const textarea = getByTestId('text-area')
        fireEvent.keyDown(textarea, { key: 'Escape' })

        expect(queryByTestId('text-area')).not.toBeInTheDocument()
    })
})
