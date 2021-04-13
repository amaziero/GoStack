import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

// Tipagem quando não há sobrescreção de tipos já build in
// se declara um type para a variável
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Caregando...' : children}
  </Container>
);

export default Button;
