import { FC, useEffect, useState } from 'react';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import '@fortawesome/fontawesome-svg-core/styles.css'

import { store } from '../state/store';
import { getTheme } from '../styles/generate-theme';
import { Header } from '../components/Header';
import { useAppSelector } from '../state/hooks';
import { selectTheme } from '../state/slices/theme.state';
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <ThemeWrapper>
          <Header />
          <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  )
}

function ThemeWrapper({ children }) {
  const [theme, setTheme] = useState<any>();
  const primaryColorOverride = useAppSelector(selectTheme);

  useEffect(() => {
    setTheme(getTheme(4));
  }, [])

  return !theme ? null : (
    <ThemeProvider theme={{ ...theme, primaryColorOverride }}>
      {children}
    </ThemeProvider>
  );
}

export default MyApp
