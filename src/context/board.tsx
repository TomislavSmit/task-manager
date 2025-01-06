import { createContext, useEffect, useState } from 'react'
import { Spinner } from '../components/UI'
import { IColumn, ITask } from '../types'
import { fetchColumnOrder, fetchColumns, fetchTasks } from '../api/board'
import { useDebounce } from '../hooks/useDebounce'

interface BoardContextProps {
    tasksInitial: ITask[] | null
    tasks: ITask[] | null
    columns: IColumn[] | null
    columnOrder: string[] | null
    setTasksInitial: (tasks: ITask[]) => void
    setColumns: (columns: IColumn[]) => void
    setColumnOrder: (columnOrder: string[]) => void
    searchTerm: string
    setSearchTerm: (searchTerm: string) => void
}

const BoardContext = createContext<BoardContextProps>({
    tasksInitial: null,
    tasks: null,
    columns: null,
    columnOrder: null,
    setTasksInitial: () => {},
    setColumns: () => {},
    setColumnOrder: () => {},
    searchTerm: '',
    setSearchTerm: () => {},
})

const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tasksInitial, setTasksInitial] = useState<ITask[] | null>(null)
    const [columns, setColumns] = useState<IColumn[] | null>(null)
    const [columnOrder, setColumnOrder] = useState<string[] | null>(null)

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [loading, setLoading] = useState(true)

    const debounceSearchTerm = useDebounce(searchTerm)

    useEffect(() => {
        const fetchInitialBoard = async () => {
            try {
                const tasksResults = await fetchTasks()
                const columnsResults = await fetchColumns()
                const columnOrderResults = await fetchColumnOrder()

                setTasksInitial(tasksResults)
                setColumns(columnsResults)
                setColumnOrder(Object.keys(columnOrderResults))
            } finally {
                setLoading(false)
            }
        }

        fetchInitialBoard()
    }, [])

    if (loading || !tasksInitial || !columns || !columnOrder) {
        return <Spinner />
    }

    const tasks = tasksInitial.filter((task) =>
        task.content.toLowerCase().includes(debounceSearchTerm.toLowerCase())
    )

    return (
        <BoardContext.Provider
            value={{
                tasksInitial,
                tasks,
                columns,
                columnOrder,
                setTasksInitial,
                setColumns,
                setColumnOrder,
                searchTerm,
                setSearchTerm,
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}

export { BoardProvider }
export default BoardContext
