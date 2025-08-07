import React, { createContext, useState, useEffect, useMemo } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  setUsername: (username: string | null) => void;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  setUsername: () => {},
  setToken: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [username, setUserState] = useState<string | null>(
    localStorage.getItem("username")
  );

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
    setTokenState(newToken);
  };

  const setUsername = (username: string | null) => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
    setUserState(username);
  };

  const value = useMemo(
    () => ({ token, setToken, username, setUsername }),
    [token, username]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
