import { create } from "zustand";

const useAuthStore = create((set) => ({
  setData: (name, email, about, props, verified) => set({ name, email, about, props, verified }),
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus, loading: false }),
  setSuggestions: (suggestions) => set({ suggestions }),
  setPendings: (pendings) => set({ pendings }),
  setProgram: (program) => set({ program }),
  setInvite: (invite) => set({ invite }),
  setAbout: (about) => set({ about }),
  setProps: (props) => set({ props }),
  setType: (type) => set({ type }),
  setName: (name) => set({ name }),
  setTeam: (team) => set({ team }),

  isAuthenticated: false,
  suggestions: [],
  loading: true,
  authData: {},
  pendings: [],
  type: "solo",
  invite: null,
  verified: 0,
  program: "",
  team: null,
  email: "",
  about: "",
  props: {},
  name: ""
}));

export default useAuthStore;
