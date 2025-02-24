// src/store/modules/auth/actions.ts
import { SET_USER, CLEAR_USER, SerializableUser } from './types';

export interface SetUserAction {
  type: typeof SET_USER;
  payload: SerializableUser | null;
}

export interface ClearUserAction {
  type: typeof CLEAR_USER;
}

export type AuthActionTypes = SetUserAction | ClearUserAction;

export const setUser = (user: SerializableUser | null): SetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = (): ClearUserAction => ({
  type: CLEAR_USER,
});