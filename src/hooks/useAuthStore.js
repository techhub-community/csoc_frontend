import { create } from "zustand";

const useAuthStore = create((set) => ({
  setData: (name, email, about, props, verified) => set({ name, email, about, props, verified }),
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus, loading: false }),
  setAbout: (about) => set({ about }),
  setProps: (props) => set({ props }),
  setRole: (role) => set({ role }),
  setName: (name) => set({ name }),
  isAuthenticated: false,
  role: "mentee",
  loading: true,
  authData: {},
  verified: 0,
  email: "",
  about: "",
  props: {},
  name: ""
}));

export default useAuthStore;
