import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Header, RespositoryInfo, Issues } from './styles';
import api from '../../services/api';

interface RespositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: string;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Respository: React.FC = () => {
  const [respository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const { params } = useRouteMatch<RespositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });

    // async function loadData(): Promise<void> {
    //   const [respository, issues] = await Promise.all([
    //     api.get(`respo/${params.repository}`),
    //     api.get(`respo/${params.repository}/issues`),
    //   ]);
    // }
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {respository && (
        <RespositoryInfo>
          <header>
            <img
              src={respository.owner.avatar_url}
              alt={respository.owner.login}
            />
            <div>
              <strong>{respository.full_name}</strong>
              <p>{respository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{respository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{respository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{respository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RespositoryInfo>
      )}

      <Issues>
        {issues.map(issue => {
          return (
            <a key={issue.id} href={issue.html_url}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          );
        })}
      </Issues>
    </>
  );
};

export default Respository;
