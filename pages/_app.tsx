import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { wrapper } from "../store/store";
import { NotificationsProvider } from '@mantine/notifications'
import Head from 'next/head';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

declare global {
  interface Window {
    gtag: (
      key: string,
      trackingId: string,
      config: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
      }
    ) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />

            <meta property="og:title" content="Yepp AI | Your Custom AI" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="http://drive.google.com/uc?export=view&id=1FDGWNY8-NvmGRAApCeHz8mXV-h7uWBy6"/>
            <meta property="og:url" content="https://www.yepp.ai"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta property="og:description" content="Upload files, explore websites, and YouTube videos and harness the power of you custom AI!"/>
            <meta property="og:site_name" content="Yepp AI | Your Custom AI"/>
            <meta name="twitter:image:alt" content="Yepp AI logo"></meta>
            <meta name="twitter:image" content="http://drive.google.com/uc?export=view&id=1FDGWNY8-NvmGRAApCeHz8mXV-h7uWBy6"></meta>
      </Head>
      <NotificationsProvider zIndex={2077}>
        <Component {...pageProps} />
      </NotificationsProvider>
    </main>
  )
}

export default wrapper.withRedux(MyApp);