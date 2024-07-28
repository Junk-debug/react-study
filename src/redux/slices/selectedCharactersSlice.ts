import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Character } from "../../api/types";

const charactersAdapter = createEntityAdapter<Character>();

const initialState = {
  selectedCharacters: charactersAdapter.getInitialState(),
};

const selectedCharactersSlice = createSlice({
  name: "selectedCharacters",
  initialState,
  selectors: {
    selectSelectedCharacters: (state) => state.selectedCharacters,

    selectSelectedIds: (state) => state.selectedCharacters.ids,

    selectSelectedCharactersAmount: (state) =>
      Object.keys(state.selectedCharacters.ids).length,
  },
  reducers: {
    select: (state, action: { payload: Character }) => {
      const user = action.payload;
      charactersAdapter.upsertOne(state.selectedCharacters, user);
    },
    unselect: (state, action: { payload: Character["id"] }) => {
      const id = action.payload;
      charactersAdapter.removeOne(state.selectedCharacters, id);
    },
    unselectAll: (state) => {
      charactersAdapter.removeAll(state.selectedCharacters);
    },
  },
});

export default selectedCharactersSlice.reducer;

export const {
  select: selectCharacter,
  unselect: unselectCharacter,
  unselectAll: unselectAllCharacters,
} = selectedCharactersSlice.actions;

export const {
  selectSelectedCharacters,
  selectSelectedIds,
  selectSelectedCharactersAmount,
} = selectedCharactersSlice.selectors;

export const selectIsSelected = createSelector(
  [selectSelectedIds, (_, id: Character["id"]) => id],
  (ids, id) => ids.includes(id),
);
