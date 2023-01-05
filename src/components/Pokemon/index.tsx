import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css"

type PokemonProps = {
  name: string;
  detailsUrl: string;
};

type Details = {
  imageUrl: string;
  experience: string;
};
export function Pokemon({ name, detailsUrl }: PokemonProps) {
  const [details, setDetails] = useState<Details>({} as Details);

  useEffect(() => {
    axios.get(detailsUrl).then(({ data }) =>
      setDetails({
        imageUrl: data.sprites.other.dream_world.front_default,
        experience: data.base_experience,
      })
    );
  }, []);

  return (
    <div className="pokemon-container">
      <img src={details.imageUrl} alt={name} />
      <h3>{name}</h3>
      <span>{details.experience} XP</span>
    </div>
  );
}
