import React, { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { AppContext } from "./Main";

function PokemonCard(props) {
  const { state } = useContext(AppContext);
  let { currPokemon } = state;

  const [num, setNum] = useState();
  const [description, setDescription] = useState("");

  function getPokemonDescription(num) {
    const descUrl = `https://pokeapi.co/api/v2/pokemon-species/${num}`;
    fetch(descUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setDescription(
          data.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ")
        );
      })
      .catch((err) => {
        console.error("Error while fetching description: " + err);
      });
  }

  //run every time currPokemon is loaded into state
  useEffect(() => {
    fetch(currPokemon.url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setNum(data.id);
        getPokemonDescription(num);
      })
      .catch((err) => {
        console.error("Error while fetching pokemon id: " + err);
      });
  }, [currPokemon, num]);

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${num}.gif`;

  return (
    <div>
      <img src={spriteUrl} alt={`an animated sprite of ${currPokemon.name}`} />
      <h2 className="pokemon-name">{currPokemon.name}</h2>
      <p className="pokemon-description">{description}</p>
    </div>
  );
}

export default PokemonCard;
