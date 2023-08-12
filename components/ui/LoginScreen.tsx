import { Button, Modal, Backdrop, Fade, Box, Typography, Grid } from "@mui/material"
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: "400px",
    bgcolor: 'transparent',
    p: 4,
};

interface Props {
    open: boolean;
    handleClose: () => void;
}

export const LoginScreen: FC<Props> = ({ open, handleClose }) => {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Grid container gap={1}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => signIn('google')}
                            startIcon={<Image src="/google.png" width={30} height={30} alt="Google" />}
                        >
                            <span style={{ width: "200px", textAlign: "start" }}>Ingresar con Google</span>
                        </Button>
                        <Button variant="contained" fullWidth startIcon={<Image src="/facebook.png" width={30} height={30} alt="Google" />}>
                            <span style={{ width: "200px", textAlign: "start" }}>Ingresar con Facebook</span>
                        </Button>
                        <Button variant="contained" fullWidth startIcon={<Image src="/instagram.png" width={30} height={30} alt="Google" />}>
                            <span style={{ width: "200px", textAlign: "start" }}>Ingresar con Instagram</span>
                        </Button>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}
