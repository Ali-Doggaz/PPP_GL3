import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { NextUIProvider,createTheme } from "@nextui-org/react";
import 'tailwindcss/tailwind.css';

const theme = createTheme({
  type:"light"
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
