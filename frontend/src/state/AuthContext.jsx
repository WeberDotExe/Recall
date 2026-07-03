import { createContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const isAuthenticated = Boolean(accessToken);

  const setAuth = ({ user, accessToken }) => {
    if (user !== undefined) {
      setUser(user);
    }

    setAccessToken(accessToken || null);
  };

  const clearAuth = () => {
    setUser(null);
    setAccessToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      setAuth,
      clearAuth,
    }),
    [user, accessToken, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };