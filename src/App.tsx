import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "./components/Pokemon";
import "./app.css";

type Data = {
  name: string;
  url: string;
};

function App() {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => handleRequest(response.data.results))
      .finally(() => setIsLoading(false));
  }, []);

  const handleRequest = (data: Data[]) => {
    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setData(sortedData);
  };

  return (
    <div className="App">
      <h1>Pokemon list</h1>
      <main>
        {isLoading && <h2>Carregando...</h2>}
        {!!data.length &&
          data.map((item) => (
            <Pokemon key={item.name} name={item.name} detailsUrl={item.url} />
          ))}
      </main>
    </div>
  );
}

export default App;
