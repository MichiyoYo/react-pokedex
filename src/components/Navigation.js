import React, { useContext } from "react";
import { getNextPokemon, getPrevPokemon } from "../api/utils";
import { AppContext } from "./Main";

function Navigation(props) {
  const { data, state, dispatch } = useContext(AppContext);
  const { currPokemon, next, prev } = state;

  return (
    <div>
      <button
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
      </button>
      <button
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
      </button>
    </div>
  );
}

export default Navigation;
