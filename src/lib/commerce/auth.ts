import type { AuthService } from "./types";

export const authService: AuthService = {
  async signIn() {
    throw new Error("Authentication not yet implemented");
  },

  async signOut() {
    // Future: clear session
  },

  async getCurrentUser() {
    return null;
  },
};
