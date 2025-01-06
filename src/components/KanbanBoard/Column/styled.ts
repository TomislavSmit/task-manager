import styled from 'styled-components'

export const Container = styled.div<{ $backgroundColor: string }>`
    margin: 0.6rem;
    border: 0.0625rem solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
    min-width: 10rem;
    max-width: 14rem;
    background: rgba(${({ $backgroundColor }) => $backgroundColor}, 0.5);
    color: white;

    > div > div {
        border: none;
        background: rgba(${({ $backgroundColor }) => $backgroundColor}, 0.8);
    }
`

export const Title = styled.h4`
    padding: 0 0.75rem;
    margin: 0;
`

export const TasksList = styled.div`
    padding: 0.75rem;
    height: max-content;
    min-height: 10rem;
`

export const Header = styled.div<{ $backgroundColor: string }>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.25rem 0.25rem 0 0;
    min-height: 1.5rem;
    background-color: rgba(${({ $backgroundColor }) => $backgroundColor}, 1);
    color: white;
`

export const PlusIcon = styled.button`
    padding: 0.5rem;
    font-size: larger;
    border: none;
    background: none;
    color: white;
    cursor: pointer;
`
