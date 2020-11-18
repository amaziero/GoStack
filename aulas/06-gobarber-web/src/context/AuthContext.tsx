import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface AuthContextProps {
  name: string;
  signIn(credentials: SignInProps): Promise<void>;
}

interface SignInProps {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    const response = await api.post('sessions', { email, password });

    console.log(response);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        name: 'Alison',
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
