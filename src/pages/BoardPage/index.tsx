import { useContext } from 'react'
import BoardContext from '../../context/board'
import { KanbanBoard } from '../../components/kanban-board'
import { Header, SearchContainer, SearchInput } from './styled'

const BoardPage = () => {
    const { setSearchTerm } = useContext(BoardContext)

    return (
        <>
            <Header data-testid='board-page-header'>
                <SearchContainer>
                    <SearchInput
                        data-testid='search-input'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchContainer>
            </Header>
            <KanbanBoard />
        </>
    )
}

export { BoardPage }
