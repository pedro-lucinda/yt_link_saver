import { create } from "zustand";
import { updateUser } from "./actions";
import { IUser, UserStore } from "./types";

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "John Doe",
    email: "",
  },

  updateUser: (user: Partial<IUser>) => updateUser(user, set),
}));
