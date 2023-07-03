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
            <meta name="google-site-verification" content="FKFRw_OQ99WnUWH5bbf1OjTi7Cg2Xjh_6I6FnfzlPdA" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />

            <meta property="og:title" content="Yepp AI | Your Custom AI" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="http://drive.google.com/uc?export=view&id=1QlMCOks7ZD32D6nm4dkZ3XKMduvVd2gO"/>
            <meta property="og:url" content="http://drive.google.com/uc?export=view&id=1QlMCOks7ZD32D6nm4dkZ3XKMduvVd2gO"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta property="og:description" content="Upload files, explore websites, and watch YouTube videos to fully experience the capabilities of our AI!"/>
            <meta property="og:site_name" content="Yepp AI | Your Custom AI"/>
            <meta name="twitter:image:alt" content="YeppAI logo"></meta>
            <meta name="twitter:image" content="http://drive.google.com/uc?export=view&id=1QlMCOks7ZD32D6nm4dkZ3XKMduvVd2gO"></meta>
      </Head>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-R8M9MNW23W`} />

      <Script id="google analytics"strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-R8M9MNW23W');
          `}
      </Script>
      <Script id="tag manager"strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M27MWLQ');
          `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M27MWLQ"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
      <NotificationsProvider zIndex={2077}>
        <Component {...pageProps} />
      </NotificationsProvider>
    </main>
  )
}

export default wrapper.withRedux(MyApp);