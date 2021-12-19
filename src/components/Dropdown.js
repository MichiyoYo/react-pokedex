import { MenuItem, NativeSelect, Select } from "@mui/material";
import React, { useContext } from "react";
import {
  findPokemonByName,
  getNextPokemon,
  getPrevPokemon,
} from "../api/utils";
import { AppContext } from "./Main";

function Dropdown(props) {
  const { state, data, dispatch } = useContext(AppContext);
  const { currPokemon } = state;

  return (
    <div>
      <Select
        sx={{
          margin: `20px`,
          padding: `0`,
          bgcolor: "#ffffffab",
        }}
        value={currPokemon.name}
        onChange={(e) =>
          dispatch({
            type: "SELECT_POKEMON",
            pokemon: findPokemonByName(data, e.target.value),
            next: getNextPokemon(data, e.target.value),
            prev: getPrevPokemon(data, e.target.value),
          })
        }
      >
        {data.map((data, id) => (
          <MenuItem key={id} value={data.name}>
            {data.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default Dropdown;
