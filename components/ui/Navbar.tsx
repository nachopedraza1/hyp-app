import { AccountCircle, LocalMall, SearchOutlined } from "@mui/icons-material";
import { useScrollTrigger, Slide, AppBar, Container, Grid, Link as MuiLink, IconButton, Button } from '@mui/material';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { LoginScreen } from './LoginScreen';


interface Props {
    window?: () => Window;
}

const navLinks = [
    { text: 'Destacados', href: '' },
    { text: 'Hombres', href: '' },
    { text: 'Mujeres', href: '' },
    { text: 'Accesorios', href: '' },
    { text: 'Rebajas', href: '' },
]

export const Navbar = (props: Props) => {

    const { data } = useSession();

    const { window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <Container disableGutters>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={3}>
                                <img src="/hyplogo.png" width="45px" alt="Hilos y perlas" style={{ paddingTop: "6px" }} />
                            </Grid>
                            <Grid item xs={6} textAlign="center">
                                <nav>
                                    {navLinks.map(({ text, href }) => (
                                        <MuiLink component={Link} href={href} key={text} className="menu-link">
                                            {text}
                                        </MuiLink>
                                    ))}
                                </nav>
                            </Grid>
                            <Grid item xs={3} textAlign="end">

                                <IconButton>
                                    <SearchOutlined />
                                </IconButton>

                                {
                                    data?.user &&
                                    <IconButton >
                                        <AccountCircle />
                                    </IconButton>
                                }

                                <IconButton>
                                    <LocalMall />
                                </IconButton>

                                {
                                    !data?.user &&
                                    <Button variant="contained" size="small" sx={{ ml: 1.5 }} onClick={handleOpen}>
                                        Ingresar
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </AppBar>
            </Slide >

            <LoginScreen open={open} handleClose={handleClose} />
        </>
    );
}