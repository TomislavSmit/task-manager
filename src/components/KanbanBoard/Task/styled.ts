import styled from 'styled-components'

export const Container = styled.div`
    width: auto;
    padding: 0.75rem;
    margin-bottom: 0.4rem;
    border: 0.0625rem solid #ccc;
    border-radius: 0.25rem;
`

export const Header = styled.div`
    position: relative;
    min-height: 1.5rem;
    text-align: right;
`

export const DeleteIcon = styled.button`
    position: absolute;
    right: 0;
    height: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
`

export const TextArea = styled.textarea`
    width: 90%;
    outline: none;
    border: 0.0625rem solid #ccc;
    border-radius: 0.25rem;
    margin-bottom: 0.4rem;
`
