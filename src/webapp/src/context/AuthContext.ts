import React from 'react';
import { User } from '../types/dtos';

interface AuthContextProps {
    isAuthenticated: boolean;
    userDetails: User;
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);
export default AuthContext;