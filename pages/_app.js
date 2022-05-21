import "../styles/globals.css";
// import "prismjs/themes/prism.css";
import "prism-themes/themes/prism-dracula.css";
import { PrismicProvider } from "@prismicio/react";
import { linkResolver } from "../prismicio";
import { ThemeProvider } from "next-themes";
import * as Fathom from 'fathom-client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('XZEIQAZZ', {
      includedDomains: ['maksimivanov.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <ThemeProvider attribute="class">
      <PrismicProvider linkResolver={linkResolver}>
        <Component {...pageProps} />
      </PrismicProvider>
    </ThemeProvider>
  );
}

export default MyApp;
