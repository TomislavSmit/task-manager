import { useContext } from 'react'
import { SearchContainer, SearchInput } from './styled'
import BoardContext from '../../context/board'

const SearchBar: React.FC = () => {
    const { setSearchTerm } = useContext(BoardContext)

    return (
        <SearchContainer>
            <SearchInput
                data-testid='search-input'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </SearchContainer>
    )
}

export default SearchBar
