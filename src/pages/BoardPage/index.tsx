import { useContext } from 'react'
import BoardContext from '../../context/board'
import { KanbanBoard } from '../../components/kanban-board'
import { Header, SearchContainer, SearchInput } from './styled'

const BoardPage = () => {
    const { searchTerm, setSearchTerm } = useContext(BoardContext)

    return (
        <>
            <Header>
                <SearchContainer>
                    <SearchInput
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </SearchContainer>
            </Header>
            <KanbanBoard />
        </>
    )
}

export { BoardPage }
