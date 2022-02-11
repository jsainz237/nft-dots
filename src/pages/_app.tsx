import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { store } from '../state/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
