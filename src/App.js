import React , {useState, useEffect} from "react";

import "./styles.css";

import api from  './services/api';


function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/hatuna",
      title: "Desafio  ReactJS",
      techs: ["React", "Node.js"],
    })
    const repository = response.data;

    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const response = repositories.filter(repository => repository.id !== id)
    setRepositories(response)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { repositories !== [] &&
          repositories.map(repository => (
          <li key={repository.id}>
              {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
