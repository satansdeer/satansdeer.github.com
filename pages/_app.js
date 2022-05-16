import "../styles/globals.css";
import "prismjs/themes/prism.css";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { repositoryName, linkResolver } from "../prismicio";

function MyApp({ Component, pageProps }) {
  return <PrismicProvider linkResolver={linkResolver}>
    <Component {...pageProps} />
  </PrismicProvider>;
}

export default MyApp;
