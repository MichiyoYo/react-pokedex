import { MenuItem, Select } from "@mui/material";
import React, { useContext } from "react";
import {
  findPokemonByName,
  getNextPokemon,
  getPrevPokemon,
} from "../api/utils";
import { AppContext } from "./Main";
import { styled } from "@mui/system";

const CustomSelect = styled(Select)({
  textTransform: "capitalize",
});

function Dropdown(props) {
  const { state, data, dispatch } = useContext(AppContext);
  const { currPokemon } = state;

  return (
    <div>
      <CustomSelect
        sx={{
          margin: `20px`,
          marginTop: `0`,
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
          <MenuItem
            sx={{
              textTransform: "capitalize",
            }}
            key={id}
            value={data.name}
          >
            {data.name}
          </MenuItem>
        ))}
      </CustomSelect>
    </div>
  );
}

export default Dropdown;
