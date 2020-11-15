import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="Logo GoBarber" />

      <form>
        <h1>Faça o seu Logon</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="teste">Esqueci minha senha</a>
      </form>

      <a href="/criarconta">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
