import styled from 'styled-components'

export const SearchContainer = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    padding: 1rem;
`
export const Header = styled.header`
    position: relative;
    display: flex;
    justify-content: space-between;
    min-height: 1.25rem;
    padding: 1rem;
`
export const SearchInput = styled.input.attrs({ placeholder: 'Search...' })`
    outline: none;
    border: 0.0625rem solid #ccc;
    border-radius: 0.25rem;
    padding: 0.4rem;
    width: 100%;
    max-width: 14rem;
`
