import { FC, ReactNode } from "react";
import Head from "next/head";

import { Grid } from "@mui/material";

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
            <main>
                <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
                    {children}
                </Grid>
            </main>
        </>
    )
}
