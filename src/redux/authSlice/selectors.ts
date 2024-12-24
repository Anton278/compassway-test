import { RootState } from "../store";

export const selectIsAuthed = (state: RootState) => state.auth.isAuthed;
export const selectUser = (state: RootState) => state.auth.user;
