import React, { useState, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Title, Form, Respositories } from './styles';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [respositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`repos/${newRepo}`);
    const repository = response.data;

    setRepositories([...respositories, repository]);
    setNewRepo('');
  }

  return (
    <>
      <img src={logo} alt="logo from github" />
      <Title>Explore Repositorios no github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Respositories>
        {respositories.map(respository => (
          <a
            key={respository.full_name}
            href={`https://github.com/${respository.full_name}`}
          >
            <img
              src={respository.owner.avatar_url}
              alt={respository.owner.login}
            />
            <div>
              <strong>{respository.full_name}</strong>
              <p>{respository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Respositories>
    </>
  );
};

export default Dashboard;
