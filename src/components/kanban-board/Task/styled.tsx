import styled from 'styled-components'

export const Container = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 0.4rem;
    width: auto;
`

export const Header = styled.div`
    text-align: right;
    min-height: 20px;
    position: relative;
`

export const DeleteIcon = styled.span`
    cursor: pointer;
    height: 20px;
    position: absolute;
    right: 0;
`

export const TextArea = styled.textarea`
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 0.4rem;
    outline: none;
`
