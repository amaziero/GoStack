import React, { useState, useEffect } from 'react';
import Header from './Header';

import './styles/App.css';
// import backgroundImage from '../assets/background.jpg';
import api from '../services/api';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProjects() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Alison Maziero',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="homepage" />
      {/* <img width="300" src={backgroundImage} alt="Background" /> */}

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProjects}>
        Adiconar Projeto
      </button>
    </>
  );
}

export default App;
