import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Raleway:wght@400;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            key="rss-feed"
            rel="alternative"
            type="application/rss+xml"
            title="RSS feed for maksimivanov.com"
            href="/feed"
          />
          <link
            key="atom-feed"
            rel="alternative"
            type="application/atom+xml"
            title="Atom feed for maksimivanov.com"
            href="/feed/atom"
          />
          <link
            key="json-feed"
            rel="alternative"
            type="application/feed+json"
            title="JSON feed for maksimivanov.com"
            href="/feed/json"
          />
        </Head>
        <body className="dark:bg-slate-900 transition-colors duration-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
