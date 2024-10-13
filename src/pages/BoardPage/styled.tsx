import styled from 'styled-components'

export const SearchContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    padding: 1rem;
`
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    position: relative;
    padding: 1rem;
`
export const SearchInput = styled.input.attrs({ placeholder: 'Search...' })`
    border: 1px solid #ccc;
    outline: none;
    border-radius: 4px;
    padding: 0.4rem;
    width: 100%;
    max-width: 220px;
`
export const ViewSelector = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
`
