import styled from 'styled-components'

export const Container = styled.div`
    margin: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    min-width: 180px;
    max-width: 220px;
`

export const Title = styled.h4`
    padding: 0 10px;
    margin: 0;
`

export const TasksList = styled.div`
    padding: 10px;
    min-height: 180px;
    height: 100%;
`

export const Header = styled.div<{ $backgroundColor: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 20px;
    position: relative;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    color: white;
    border-radius: 4px 4px 0 0;
`

export const PlusIcon = styled.span`
    cursor: pointer;
    padding: 0.5rem;
    font-size: larger;
`
