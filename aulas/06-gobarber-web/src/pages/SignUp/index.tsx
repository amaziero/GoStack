import React, { useCallback } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: SignUpProps) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('You must insert an valid email account'),
        password: Yup.string().min(
          6,
          'The password must have at least 6 characters',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
