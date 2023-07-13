import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';

import { getProviders, getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { isEmail } from '@/utils';

import { Box, Button, Checkbox, Chip, Divider, FormControlLabel, FormGroup, Grid, Link, TextField, Typography } from '@mui/material';
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
        setShowError(false)
        const resp = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (resp?.error) {
            setShowError(true)
            setTimeout(() => setShowError(false), 3000);
        } else {
            router.push('/');
        }
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
                            <Typography variant='h6'>Nos alegra verte de nuevo!</Typography>
                            <Chip
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
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
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Recordame" />
                            </FormGroup>
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

                            <Typography textAlign="center" mt={1}> Olvidaste tu contraseña? </Typography>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100%' }} >Or</Divider>
                            {/* {
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
                            } */}

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
                                    No tienes cuenta?
                                    <NextLink
                                        href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                                        passHref legacyBehavior
                                    >
                                        <Link>
                                            Registrate
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

export default LoginPage;
