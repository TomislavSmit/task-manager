import styled from "styled-components"

export const ButtonStyled = styled.button<{ $primary?: boolean }>`
    background: ${(props) => (props.$primary ? "#448fd5" : "white")};
    color: ${(props) => (props.$primary ? "white" : "#448fd5")};
    font-size: 1em;
    padding: 0.25em 1em;
    border: 2px solid #448fd5;
    border-radius: 4px;
`
