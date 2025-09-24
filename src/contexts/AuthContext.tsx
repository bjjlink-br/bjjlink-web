import { api } from "@/services/api";
import { authUser } from "@/services/userService.service";
import { AuthContextData, AuthState, UserLogin } from "@/utils/types";

import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AUTH_STORAGE_KEY = '@Bjjlink:auth';
export const USER_DATA_STORAGE_KEY = '@Bjjlink-user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<AuthState>(() => {
      const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
  
      if (storedData) {
        const { acess_token } = JSON.parse(storedData);
  
        if (acess_token) {
          api.defaults.headers.token = acess_token;
          return { acess_token, isAuthenticated: true, isLoading: false };
        }
      }
  
      return { acess_token: null, isAuthenticated: false, isLoading: false };
    });

    const signIn = useCallback(async ({ email, password }: UserLogin) => {
        try {
          const response = await authUser({ email, password });
    
          const { acess_token } = response;
    
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ acess_token }));
          api.defaults.headers.token = acess_token;
    
          setData({ acess_token, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error(error);
          throw new Error('Credenciais inválidas');
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        api.defaults.headers.token = '';
        setData({ acess_token: null, isAuthenticated: false, isLoading: false });
    }, []);

    return (
        <AuthContext.Provider
          value={{
            ...data,
            signIn,
            signOut,
          }}
        >
          {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
  
    return context;
}