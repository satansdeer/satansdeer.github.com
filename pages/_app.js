import "../styles/globals.css";
// import "prismjs/themes/prism.css";
import "prism-themes/themes/prism-dracula.css";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { repositoryName, linkResolver } from "../prismicio";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <PrismicProvider linkResolver={linkResolver}>
        <Component {...pageProps} />
      </PrismicProvider>
    </ThemeProvider>
  );
}

export default MyApp;
