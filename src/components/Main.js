import React, { createContext, useEffect, useReducer, useState } from "react";
import Dropdown from "./Dropdown";
import Navigation from "./Navigation";
import PokemonCard from "./PokemonCard";

import { createTheme } from "@mui/material/styles";
import { teal, deepPurple } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: deepPurple,
  },
});

export const AppContext = createContext();
function Main(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    currPokemon: null,
    next: null,
    prev: null,
  });

  function reducer(state, action) {
    switch (action.type) {
      case "INIT":
        return {
          currPokemon: action.pokemon,
          next: action.next,
          prev: null,
        };
      case "SELECT_POKEMON":
        return {
          currPokemon: action.pokemon,
          next: action.next,
          prev: action.prev,
        };
      case "GOTO_NEXT":
        return {
          currPokemon: action.currPokemon,
          next: action.next,
          prev: action.prev,
        };
      case "GOTO_PREV":
        return {
          currPokemon: action.currPokemon,
          next: action.next,
          prev: action.prev,
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data.results);
        dispatch({
          type: "INIT",
          pokemon: data.results[0],
          next: data.results[1],
        });
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <AppContext.Provider value={{ state, data, dispatch }}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: 350,
            height: 500,
            padding: "20px",
          }}
        >
          <Dropdown />
          <PokemonCard />
          <Navigation />
        </Box>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default Main;
