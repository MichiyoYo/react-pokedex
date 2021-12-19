import { Button } from "@mui/material";
import React, { useContext } from "react";
import { getNextPokemon, getPrevPokemon } from "../api/utils";
import { AppContext } from "./Main";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;

function Navigation(props) {
  const { data, state, dispatch } = useContext(AppContext);
  const { currPokemon, next, prev } = state;

  return (
    <ButtonWrapper>
      <Button
        className="btn-prev"
        variant="contained"
        color="secondary"
        disabled={!prev ? true : false}
        onClick={() => {
          const oldCurr = currPokemon;
          dispatch({
            type: "GOTO_PREV",
            currPokemon: prev,
            next: oldCurr,
            prev: getPrevPokemon(data, oldCurr.name),
          });
        }}
      >
        Prev
      </Button>
      <Button
        variant="contained"
        disabled={!next ? true : false}
        onClick={() => {
          const oldCurr = currPokemon;
          dispatch({
            type: "GOTO_NEXT",
            currPokemon: next,
            next: getNextPokemon(data, oldCurr.name),
            prev: oldCurr,
          });
        }}
      >
        Next
      </Button>
    </ButtonWrapper>
  );
}

export default Navigation;
