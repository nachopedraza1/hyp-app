import { FC, ReactNode } from "react";
import Head from "next/head";

interface Props {
    title: string,
    children: ReactNode,
    pageDescription: string

}

export const MainLayout: FC<Props> = ({ children, title, pageDescription }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
            </Head>

            {children}
        </>
    )
}
