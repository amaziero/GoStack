import React, { useState, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { Title, Form, Respositories, Error } from './styles';
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
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [respositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório que seja não vazio');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...respositories, repository]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por um novo repositório');
    }
  }

  return (
    <>
      <img src={logo} alt="logo from github" />
      <Title>Explore Repositorios no github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

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
