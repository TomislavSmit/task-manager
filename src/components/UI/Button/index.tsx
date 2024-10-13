import { ButtonHTMLAttributes } from 'react'
import { ButtonStyled } from './styled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean
}

const Button = ({ children, primary = false, ...rest }: ButtonProps) => {
    return (
        <ButtonStyled $primary={primary} {...rest}>
            {children}
        </ButtonStyled>
    )
}

export { Button }
