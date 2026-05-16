import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";

const PAGEFIND_CSS_ID = "pagefind-ui-css";
const PAGEFIND_SCRIPT_ID = "pagefind-ui-script";
const SEARCH_ELEMENT_ID = "pagefind-search";

const SearchBox = () => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    let scriptElement = document.getElementById(PAGEFIND_SCRIPT_ID);

    const initializeSearch = () => {
      if (cancelled || !containerRef.current) {
        return;
      }

      if (!window.PagefindUI) {
        setStatus("error");
        return;
      }

      containerRef.current.innerHTML = "";
      new window.PagefindUI({
        element: `#${SEARCH_ELEMENT_ID}`,
        showImages: false,
        showSubResults: true,
        resetStyles: false,
        translations: {
          placeholder: "Search articles, projects, and books",
        },
      });
      setStatus("ready");
    };

    const handleScriptError = () => {
      if (!cancelled) {
        setStatus("error");
      }
    };

    if (!document.getElementById(PAGEFIND_CSS_ID)) {
      const linkElement = document.createElement("link");
      linkElement.id = PAGEFIND_CSS_ID;
      linkElement.rel = "stylesheet";
      linkElement.href = "/pagefind/pagefind-ui.css";
      document.head.appendChild(linkElement);
    }

    if (window.PagefindUI) {
      initializeSearch();
      return () => {
        cancelled = true;
      };
    }

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = PAGEFIND_SCRIPT_ID;
      scriptElement.src = "/pagefind/pagefind-ui.js";
      scriptElement.async = true;
      document.body.appendChild(scriptElement);
    }

    scriptElement.addEventListener("load", initializeSearch);
    scriptElement.addEventListener("error", handleScriptError);

    return () => {
      cancelled = true;
      scriptElement.removeEventListener("load", initializeSearch);
      scriptElement.removeEventListener("error", handleScriptError);
    };
  }, []);

  return (
    <div className="search-panel not-prose">
      <div ref={containerRef} id={SEARCH_ELEMENT_ID} />
      {status === "loading" && (
        <div className="h-14 rounded border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
          <span className="sr-only">Loading search</span>
        </div>
      )}
      {status === "error" && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          Search index could not be loaded.
        </p>
      )}
      <style jsx global>{`
        .search-panel .pagefind-ui {
          --pagefind-ui-scale: 0.95;
          --pagefind-ui-primary: #0f172a;
          --pagefind-ui-text: #1e293b;
          --pagefind-ui-background: #ffffff;
          --pagefind-ui-border: #cbd5e1;
          --pagefind-ui-tag: #f1f5f9;
          --pagefind-ui-border-width: 1px;
          --pagefind-ui-border-radius: 6px;
          --pagefind-ui-image-border-radius: 6px;
          --pagefind-ui-font: -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }

        .dark .search-panel .pagefind-ui {
          --pagefind-ui-primary: #f8fafc;
          --pagefind-ui-text: #e2e8f0;
          --pagefind-ui-background: #020617;
          --pagefind-ui-border: #334155;
          --pagefind-ui-tag: #0f172a;
        }

        .search-panel .pagefind-ui__form::before {
          opacity: 0.55;
        }

        .search-panel .pagefind-ui__search-input {
          box-shadow: none;
          font-weight: 600;
        }

        .search-panel .pagefind-ui__search-input:focus {
          border-color: #64748b;
          box-shadow: 0 0 0 3px rgba(100, 116, 139, 0.2);
        }

        .search-panel .pagefind-ui__drawer {
          margin-top: 1.5rem;
        }

        .search-panel .pagefind-ui__result {
          border-top-color: #e2e8f0;
          padding: 1.25rem 0;
        }

        .dark .search-panel .pagefind-ui__result {
          border-top-color: #1e293b;
        }

        .search-panel .pagefind-ui__result-link {
          font-weight: 800;
          letter-spacing: 0;
        }
      `}</style>
    </div>
  );
};

const SearchPage = () => {
  return (
    <>
      <Head>
        <title>Search | Maksim Ivanov</title>
        <meta
          name="description"
          content="Search articles, projects, and books on maksimivanov.com."
        />
      </Head>
      <Header />
      <div className="w-full flex flex-col flex-grow">
        <div className="container mx-auto px-6">
          <article
            className="max-w-screen-md mx-auto mt-10 mb-16 lg:mt-24 md:mt-20"
            data-pagefind-ignore="all"
          >
            <main className="prose dark:prose-invert sm:prose-lg lg:prose-xl">
              <h1>Search</h1>
              <SearchBox />
            </main>
          </article>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
