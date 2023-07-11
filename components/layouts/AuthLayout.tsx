
import { FC, ReactNode } from "react";
import Head from "next/head";


import { Grid } from "@mui/material";
import Image from "next/image";

interface Props {
    title: string,
    children: ReactNode,
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="og:title" content={title} />
            </Head>
            <main >
                <Grid container alignItems="center" justifyContent="center" className="bg-auth">
                    <Grid item xs={6} display="flex" alignItems="center" justifyContent="center">
                        {children}
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                        
                    </Grid>
                </Grid>
            </main>
        </>
    )
}
