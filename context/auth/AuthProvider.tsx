import { FC, ReactNode, useReducer } from 'react';
import { AuthContext, authReducer } from './';

export interface AuthState {
    isLoggedIn: boolean;
}


const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
}


export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            ...state
        }}>
            {children}
        </AuthContext.Provider>
    )
};