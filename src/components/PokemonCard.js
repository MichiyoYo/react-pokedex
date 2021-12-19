import React from "react";

function PokemonCard(props) {
  return (
    <div>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif"
        alt="pokemon"
      />
      <h2 className="pokemon-name">Bulbasaur</h2>
      <p className="pokemon-description">blablabla</p>
    </div>
  );
}

export default PokemonCard;
