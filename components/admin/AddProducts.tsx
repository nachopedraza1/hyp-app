import { FC } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { IProduct } from "@/interfaces";


export const AddProducts: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();

    return (
        <>
            <Typography variant="h5" mb={2}> Agregar un Producto </Typography>
            <form>
                <Grid container >
                    <Grid item xs={6}>
                        <Grid container gap={2}>
                            <TextField
                                fullWidth
                                label="Producto"
                                placeholder="Ingrese el título del producto."
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                {...register("title", {
                                    required: true,
                                    minLength: { value: 3, message: "Mínimo 3 caracteres." }
                                })}
                            />
                            <TextField
                                fullWidth
                                label="Descripcion"
                                multiline
                                rows={4}
                                placeholder="Ingrese una descripcion del producto."
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                {...register("description", {
                                    required: true,
                                    minLength: { value: 10, message: "Mínimo 10 caracteres." }
                                })}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>

                    </Grid>
                </Grid>
            </form>
        </>
    )
}
