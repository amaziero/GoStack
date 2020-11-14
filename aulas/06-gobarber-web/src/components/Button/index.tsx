import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// Tipagem quando não há sobrescreção de tipos já build in
// se declara um type para a variável
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
