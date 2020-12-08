import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Desafio React.js ${Date.now()}`,
      owner: "Andre Peixoto",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  // async function handleRemoveRepository(id) {
  //   const response = await api.delete("repositories",
  // }

  return (
    <div>
      <h1>Repositories</h1>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>{repository.title}</li>
        ))}

        <button onClick={() => handleRemoveRepository(1)}>Remover</button>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
