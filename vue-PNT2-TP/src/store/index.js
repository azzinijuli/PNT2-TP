import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === "admin",
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.get(
          "https://67183d04b910c6a6e02b6eae.mockapi.io/api/bibliotecacircular/users"
        );
        const user = response.data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          this.token = user.token;
          this.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(user.token));
        } else {
          console.log("Usuario no encontrado");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    },
  },
});
