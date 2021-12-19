export function findPokemonByName(pokemonList, name) {
  const caught = pokemonList.find((pokemon) => pokemon.name === name);
  return caught;
}

export function getNextPokemon(pokemonList, name) {
  const currPokemon = findPokemonByName(pokemonList, name);
  return (
    pokemonList[
      pokemonList.findIndex((pokemon) => pokemon === currPokemon) + 1
    ] || null
  );
}

export function getPrevPokemon(pokemonList, name) {
  const currPokemon = findPokemonByName(pokemonList, name);
  return (
    pokemonList[
      pokemonList.findIndex((pokemon) => pokemon === currPokemon) - 1
    ] || null
  );
}
