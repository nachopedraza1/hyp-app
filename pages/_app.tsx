import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"

import { CssBaseline, ThemeProvider } from '@mui/material';
import { defaultTheme } from '@/themes';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
