import { useContext, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import BoardContext from '../../../context/board'
import { ITask } from '../../../types'
import { updateTaskToApi } from '../../../api/board'
import { Spinner } from '../../UI'
import { Container, DeleteIcon, Header, TextArea } from './styled'

const Task = ({
    task,
    index,
    onDelete,
    creatingNewTaskId,
}: {
    task: ITask
    index: number
    onDelete: (id: string) => void
    creatingNewTaskId: string | null
}) => {
    const [showDeleteIcon, setShowDeleteIcon] = useState(false)
    const [newContent, setNewContent] = useState(task.content)
    const [isEditind, setIsEditing] = useState(false)

    const { tasksInitial, setTasksInitial } = useContext(BoardContext)

    useEffect(() => {
        if (creatingNewTaskId === task.id) {
            setIsEditing(true)
        }
    }, [creatingNewTaskId, task.id])

    if (!tasksInitial) {
        return <Spinner />
    }

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent
    ) => {
        e.preventDefault()
        const newTasks = tasksInitial.map((t) => {
            if (t.id === task.id) {
                return {
                    ...t,
                    content: newContent,
                }
            }
            return t
        })
        const editedTask = tasksInitial.find((t) => t.id === task.id)
        if (!editedTask) return
        editedTask.content = newContent

        setTasksInitial(newTasks)
        updateTaskToApi(editedTask)
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }

        if (e.key === 'Escape') {
            setIsEditing(false)
        }
    }

    const showEditing = () => {
        const focusAndMoveCaretToEnd = (
            event: React.FocusEvent<HTMLTextAreaElement>
        ) => {
            const { value } = event.target
            event.target.value = ''
            event.target.value = value
        }

        return (
            <form onSubmit={handleSubmit}>
                <TextArea
                    data-testid='text-area'
                    value={newContent}
                    onChange={(e) => {
                        setNewContent(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    onFocus={focusAndMoveCaretToEnd}
                />
            </form>
        )
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onDoubleClick={() => setIsEditing(true)}
                    onMouseOver={() => setShowDeleteIcon(true)}
                    onMouseOut={() => setShowDeleteIcon(false)}
                    data-testid={`task-${task.id}`}
                >
                    <Header>
                        {showDeleteIcon && (
                            <DeleteIcon
                                onClick={() => onDelete(task.id)}
                                data-testid='delete-icon'
                            >
                                ❌
                            </DeleteIcon>
                        )}
                    </Header>
                    {isEditind ? showEditing() : task.content}
                </Container>
            )}
        </Draggable>
    )
}

export { Task }
