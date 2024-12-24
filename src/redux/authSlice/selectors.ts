import { RootState } from "../store";

export const selectIsAuthed = (state: RootState) => state.auth.isAuthed;
