import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser as loginApi, registerUser as registerApi, getProfile } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("hrms_user");
    try {
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("hrms_token");
    return savedToken && savedToken !== "undefined" ? savedToken : null;
  });

  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem("hrms_token");
    localStorage.removeItem("hrms_user");
    setToken(null);
    setUser(null);
  }, []);

  // Verify profile on mount or when token changes
  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      if (token && token !== "undefined" && token !== "null") {
        try {
          const res = await getProfile();
          if (isMounted && res?.success && res?.user) {
            setUser(res.user);
            localStorage.setItem("hrms_user", JSON.stringify(res.user));
          }
        } catch (err) {
          if (err.response && err.response.status === 401) {
            if (isMounted) {
              localStorage.removeItem("hrms_token");
              localStorage.removeItem("hrms_user");
              setToken(null);
              setUser(null);
            }
          }
        }
      }
      // Set loading to false once verification is finished
      if (isMounted) {
        setLoading(false);
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    if (data?.success && data?.token) {
      localStorage.setItem("hrms_token", data.token);
      localStorage.setItem("hrms_user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (userData) => {
    return await registerApi(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
