import { AppProps } from 'next/app';
import '../styles/global.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../shared/components/loader';
import CookieAlert from '../shared/components/cookie-alert';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    when: 'afterChildren'
  };

  return (
    <div>
      <Head>
        <title>Alok Pal | Software Developer</title>
        <meta name="title" content="Alok Pal | Software Developer" />
        <meta
          name="description"
          content="Alok is a full stack developer who crafts beautiful web-apps, chrome extensions and apps."
        />
        <meta
          name="keywords"
          content="Alok is a full stack developer who crafts beautiful web-apps, chrome extensions and apps."
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Alok Pal" />
        <meta name="copyright" content="All rights reserved, 2021. Alok Pal" />
        <meta httpEquiv="content-language" content="en" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          <div className="page-transition-wrapper overflow-x-hidden min-h-screen">
            <motion.div
              transition={spring}
              key={router.pathname}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              id="page-transition-container">
              <Component {...pageProps} key={router.pathname} />
            </motion.div>
          </div>
          <CookieAlert />
        </AnimatePresence>
      )}
    </div>
  );
}

export default MyApp;
