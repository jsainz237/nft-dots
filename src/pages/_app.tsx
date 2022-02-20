import { useEffect, useState } from 'react';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import '@fortawesome/fontawesome-svg-core/styles.css'
import { store } from '../state/store';
import { getTheme } from '../styles/generate-theme';
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<any>();

  useEffect(() => {
    setTheme(getTheme(4));
  }, [])

  return !theme ? null : (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
