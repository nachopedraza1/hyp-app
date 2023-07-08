import { createContext } from 'react';


interface ContextProps {
    isLoggedIn: boolean;
}


export const AuthContext = createContext({} as ContextProps);