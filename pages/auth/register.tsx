import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import { useForm } from 'react-hook-form';
import { isEmail } from '@/utils';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '@/components/layouts';
import { getSession } from 'next-auth/react';


type FormData = {
    name: string;
    email: string;
    password: string;
};


const RegisterPage: NextPage = () => {

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    const onRegisterForm = async ({ name, email, password }: FormData) => {

    }

    return (
        <AuthLayout title={'Registro'}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4' component="h1">Crear cuenta</Typography>
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
                                label="Nombre completo"
                                variant="filled"
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
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
                                label="Contraseña"
                                type='password'
                                variant="filled"
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
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink
                                href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                                passHref legacyBehavior
                            >
                                <Link underline='always'>
                                    ¿Ya tienes cuenta?
                                </Link>
                            </NextLink>
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
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }
}

export default RegisterPage;
