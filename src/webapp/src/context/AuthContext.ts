import React from 'react';
import {User} from '../utils/dtos';

interface AuthContextProps {
    isAuthenticated: boolean;
    userDetails: User;
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);
export default AuthContext;
