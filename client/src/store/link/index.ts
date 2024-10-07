import { create } from "zustand";
import { updateLink } from "./actions";
import { LinkStore } from "./types";

export const useLinkStore = create<LinkStore>((set) => ({
  links: null,

  updateLink: (link) => updateLink(link),
}));
