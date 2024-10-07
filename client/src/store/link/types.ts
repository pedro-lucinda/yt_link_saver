import { StoreApi } from "zustand";

export type ILink = { name: string; url: string; id: number };

export interface IState {
  links: ILink[] | null;
}

export interface IActions {
  updateLink: (link: Partial<ILink>) => void;
}

export type LinkStore = IState & IActions;

export type ISetLinkStore = StoreApi<IState>["setState"];
export type IGetLinkStore = StoreApi<IState>["getState"];
