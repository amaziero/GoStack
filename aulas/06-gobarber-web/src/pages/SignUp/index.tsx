import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  function handleSubmit(data: string): void {
    console.log(data);
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="Logo GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça o seu Cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="E-mail" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="/criarconta">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
