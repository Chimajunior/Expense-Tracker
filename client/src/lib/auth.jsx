import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./axios";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // optionally fetch /me later; for now we just decode from login/register responses
  function loginSuccess({ token, user }) {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // optional: tell server to clear cookie if you used cookies
    // api.post("/auth/logout").catch(()=>{});
    window.location.href = "/login";
  }

  const value = { token, user, setUser, loginSuccess, logout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
