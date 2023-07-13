import { useScrollTrigger, Slide, AppBar, Container, Grid } from "@mui/material";
import Link from "next/link";


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

    const { window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar>
                    <Container>
                        <Grid container pt={1}>
                            <Grid item xs={2} >
                                <img src="/hyplogo.png" width="45px" alt="Hilos y perlas" />
                            </Grid>
                            <Grid item>
                                <nav>
                                    {navLinks.map(({ text, href }) => (
                                        <Link href={href}>
                                            {text}
                                        </Link>
                                    ))}
                                </nav>
                            </Grid>
                        </Grid>
                    </Container>
                </AppBar>
            </Slide>
        </>
    );
}