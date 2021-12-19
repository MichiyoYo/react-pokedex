import { Card } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { AppContext } from "./Main";

const Heading = styled.h2`
  font-size: 35px;
  text-transform: capitalize;
`;

const Paragraph = styled.p`
  font-size: 20px;
`;

const Sprite = styled.img`
  padding: 33px;
  background: #0096887d;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin-top: 27px;
`;

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
    <Card
      sx={{
        padding: "20px",
        bgcolor: "#ffffffab",
      }}
    >
      <Sprite
        src={spriteUrl}
        alt={`an animated sprite of ${currPokemon.name}`}
      />
      <Heading className="pokemon-name">{currPokemon.name}</Heading>
      <Paragraph className="pokemon-description">{description}</Paragraph>
    </Card>
  );
}

export default PokemonCard;
