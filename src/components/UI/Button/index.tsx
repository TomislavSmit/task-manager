import { ButtonHTMLAttributes } from 'react'
import { ButtonStyled } from './styled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean
}

const Button: React.FC<ButtonProps> = ({
    children,
    primary = false,
    ...rest
}) => {
    return (
        <ButtonStyled $primary={primary} {...rest}>
            {children}
        </ButtonStyled>
    )
}

export { Button }
