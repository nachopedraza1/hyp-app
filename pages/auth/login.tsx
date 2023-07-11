import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { getProviders, getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { isEmail } from '@/utils';

import { Box, Button, Chip, Divider, Grid, InputLabel, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '@/components/layouts';


type FormData = {
    email: string;
    password: string;
};


const LoginPage: NextPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    const onLogin = async ({ email, password }: FormData) => {
        await signIn('credentials', { email, password })
    }

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLogin)} noValidate>
                <Box className="form-sign">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4' fontWeight={600}>Login</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InputLabel>
                                Ingresa tu email
                            </InputLabel>
                            <TextField
                                type="email"
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
                            <InputLabel>
                                Ingresa tu contraseña
                            </InputLabel>
                            <TextField
                                placeholder='Ingresa tu contraseña'
                                type='password'
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
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink
                                href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                                passHref legacyBehavior
                            >
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {

                                    if (provider.id === 'credentials') return (<div key="credentials"></div>);

                                    return (
                                        <Button
                                            key={provider.id}
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )

                                })
                            }

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

export default LoginPage;
