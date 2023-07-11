import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"

import { CssBaseline, ThemeProvider } from '@mui/material';
import { defaultTheme } from '@/themes';
import { AuthProvider } from '@/context';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  )
}
