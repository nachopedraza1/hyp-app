import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import axios from 'axios';

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
    }, [data, status]);

    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/auth/register', { name, email, password });
            dispatch({ type: '[Auth] - Login', payload: data.user });
            return {
                hasError: false,
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'Por favor, intentelo mas tarde.'
            }
        }
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};