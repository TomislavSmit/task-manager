import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BoardPage } from './'
import BoardContext from '../../context/board'
import { fullContext } from '../../../testsSetup'

describe('BoardPage', () => {
    it('renders Header component', () => {
        const { getByTestId } = render(<BoardPage />)
        expect(getByTestId('board-page-header')).toBeDefined()
    })

    it('renders SearchInput component', () => {
        const { getByTestId } = render(<BoardPage />)
        expect(getByTestId('search-input')).toBeDefined()
    })

    it('types in SearchInput', async () => {
        const { getByTestId } = render(
            <BoardContext.Provider value={fullContext}>
                <BoardPage />
            </BoardContext.Provider>
        )
        const searchInput = getByTestId('search-input') as HTMLInputElement
        await userEvent.type(searchInput, 'term')

        expect(searchInput.value).toBe('term')
    })
})
