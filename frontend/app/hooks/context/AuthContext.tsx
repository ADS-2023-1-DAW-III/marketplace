import React, { createContext, useState, useEffect, useMemo } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("authToken", newToken);
    } else {
      localStorage.removeItem("authToken");
    }
    setTokenState(newToken);
  };

  const value = useMemo(() => ({ token, setToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
