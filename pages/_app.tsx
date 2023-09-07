import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { wrapper } from "../store/store";
import { NotificationsProvider } from '@mantine/notifications'
import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
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

  useEffect(() => {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('country', data.country_name);
      })
      .catch(error => console.error(error));
  }, []);
  
  return (
    <main className={inter.className}>
      <Head>
            <meta name="google" content="notranslate" />
            <meta name="google-site-verification" content="DOR8UD5KTC5NxWUpLMk4JfrbcFMW3itZdlQaI1dYkaA" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />

            <meta property="og:title" content="Yepp AI | Marketing For Your Business" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="http://drive.google.com/uc?export=view&id=1FDGWNY8-NvmGRAApCeHz8mXV-h7uWBy6"/>
            <meta property="og:url" content="https://www.yepp.ai"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta property="og:description" content="Upload files, explore websites, and YouTube videos and harness the power of you custom AI!"/>
            <meta property="og:site_name" content="Yepp AI | Your Custom AI"/>
            <meta name="twitter:image:alt" content="Yepp AI logo"></meta>
            <meta name="twitter:image" content="http://drive.google.com/uc?export=view&id=1FDGWNY8-NvmGRAApCeHz8mXV-h7uWBy6"></meta>
      </Head>
      
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-WQM8PTR9`} />

      <Script id="google analytics"strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WQM8PTR9');
          `}
      </Script>
      <Script id="tag manager"strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': 
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], 
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-WQM8PTR9');
          `}
      </Script>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQM8PTR9" 
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
        }}
      />
      <NotificationsProvider zIndex={2077}>
        <Analytics />
        <Component {...pageProps} />
      </NotificationsProvider>
    </main>
  )
}

export default wrapper.withRedux(MyApp);