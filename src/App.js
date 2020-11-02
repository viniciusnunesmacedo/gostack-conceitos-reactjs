import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      })
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo Repositório ${Date.now()}`,
      owner: 'Eu mesmo'
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    var repositoryIndex = repositories.findIndex(repository => repository.id === id);
    if(repositoryIndex > -1){
      repositories.splice(repositoryIndex, 1);
    }
    
    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>

          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
