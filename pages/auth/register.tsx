import { useContext, useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

import { getProviders, getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@/context';
import { isEmail } from '@/utils';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '@/components/layouts';

type FormData = {
    name: string,
    email: string;
    password: string;
};


const RegisterPage: NextPage = () => {

    const router = useRouter();

    const { registerUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const onRegister = async ({ name, email, password }: FormData) => {
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);
        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        await signIn('credentials', { email, password });
    }

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    return (
        <AuthLayout title={'Registro'}>
            <form onSubmit={handleSubmit(onRegister)} noValidate>
                <Box className="form-sign">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4' fontWeight={600}>Registro</Typography>
                            <Chip
                                label={errorMessage}
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Nombre"
                                placeholder='Ingresa tu nombre'
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Email"
                                placeholder='Ingresa tu email'
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: isEmail

                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                placeholder='Ingresa tu contraseña'
                                type='password'
                                label="Contraseña"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                type="submit"
                                size='large'
                                fullWidth
                            >
                                Registrarme
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%' }} >Or</Divider>

                            <Grid container justifyContent="center" alignItems="center" mb={3}>
                                <Button disableTouchRipple>
                                    <Image src="/google.png" width={32} height={32} alt='google' />
                                </Button>
                                <Button disableTouchRipple>
                                    <Image src="/facebook.png" width={32} height={32} alt='google' />
                                </Button>
                                <Button disableTouchRipple>
                                    <Image src="/appled.png" width={32} height={32} alt='google' />
                                </Button>
                            </Grid>

                            <Grid container justifyContent="center" textAlign="center">
                                <Grid item xs={12} mb={1} mt={2}>
                                    Ya tienes cuenta?
                                    <NextLink
                                        href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                                        passHref legacyBehavior
                                    >
                                        <Link>
                                            Ingresa
                                        </Link>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });

    const { q = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: q.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default RegisterPage;
