import { KanbanBoard } from '../KanbanBoard'
import { Header } from './styled'
import SearchBar from '../SearchBar'

const Board: React.FC = () => {
    return (
        <>
            <Header data-testid='board-page-header'>
                <SearchBar />
            </Header>
            <KanbanBoard />
        </>
    )
}

export { Board }
