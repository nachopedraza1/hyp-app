import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const Auth_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}


export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user as IUser })
        }
    }, [data, status])


    return (
        <AuthContext.Provider value={{
            ...state
        }}>
            {children}
        </AuthContext.Provider>
    )
};