import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Title, Form, Respositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="logo from github" />
      <Title>Explore Repositorios no github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Respositories>
        <a href="/">
          <img
            src="https://avatars1.githubusercontent.com/u/56273452?s=460&u=3fca3aa0712fefb70c9b87fa871797fd8341ee6f&v=4"
            alt="foto"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Ease peasy</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="/">
          <img
            src="https://avatars1.githubusercontent.com/u/56273452?s=460&u=3fca3aa0712fefb70c9b87fa871797fd8341ee6f&v=4"
            alt="foto"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Ease peasy</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="/">
          <img
            src="https://avatars1.githubusercontent.com/u/56273452?s=460&u=3fca3aa0712fefb70c9b87fa871797fd8341ee6f&v=4"
            alt="foto"
          />
          <div>
            <strong>rocketseat/unform</strong>
            <p>Ease peasy</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Respositories>
    </>
  );
};

export default Dashboard;
