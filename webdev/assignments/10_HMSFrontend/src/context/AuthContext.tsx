import React, { useContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import type { RegisterUser } from "../pages/auth/Register";

interface User {
  id: string;
  role: string;
  propertyId: string | null;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContext {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: RegisterUser) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContext>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        const {
          _id: id,
          role,
          property: propertyId,
          firstName,
          lastName,
          email,
        } = response.data.data;

        setUser({ id, role, propertyId, firstName, lastName, email });
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    setUser(response.data.data.user);
  };
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  const register = async (input: RegisterUser) => {
    const response = await api.post("/auth/register", input);
    const {
      id,
      role,
      property: propertyId,
      firstName,
      lastName,
      email,
    } = response.data.data.userWithoutPassword;
    const user = { id, role, propertyId, firstName, lastName, email };

    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
