import { StoreApi } from "zustand";

export type IUser = { name: string; email: string };

export interface IState {
  user: IUser;
}

export interface IActions {
  updateUser: (user: Partial<IUser>) => void;
}

export type UserStore = IState & IActions;

export type ISetUserStore = StoreApi<IState>["setState"];
export type IGetUserStore = StoreApi<IState>["getState"];
