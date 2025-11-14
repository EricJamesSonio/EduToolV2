import * as authApi from "../api/authApi";

export const authService = {
  login: async (email, password) => {
    return await authApi.login(email, password);
  },
};
