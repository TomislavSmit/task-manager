import styled from 'styled-components'

export const ButtonStyled = styled.button<{ $primary?: boolean }>`
    background: ${(props) => (props.$primary ? '#448fd5' : 'white')};
    padding: 0.25em 1em;
    border: 0.125rem solid #448fd5;
    border-radius: 0.25rem;
    color: ${(props) => (props.$primary ? 'white' : '#448fd5')};
    font-size: 1em;
`
