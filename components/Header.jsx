import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { SunIcon } from "./SunIcon";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";
import { RSSIcon } from "./RSSIcon";

const navigationLinks = [
  { href: "/posts/", title: "Posts" },
  { href: "/projects/", title: "Projects" },
  { href: "/about/", title: "About" },
  { href: "https://www.youtube.com/user/satansdeer1/videos", title: "Videos" },
];

let pagefindModulePromise;

const loadPagefind = () => {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!pagefindModulePromise) {
    pagefindModulePromise = import(
      /* webpackIgnore: true */ "/pagefind/pagefind.js"
    );
  }

  return pagefindModulePromise;
};

const cleanExcerpt = (excerpt = "") =>
  excerpt
    .replace(/<\/?mark>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const NavItem = ({ children }) => {
  return (
    <li className="flex gap-2 items-center font-semibold tracking-tight text-slate-800 dark:text-slate-200">
      {children}
    </li>
  );
};

const HeaderActions = ({ theme, setTheme, className = "" }) => {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <SunIcon
        checked={theme !== "light"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="h-6 w-6"
      />
      <a href="/rss.xml" aria-label="RSS feed">
        <RSSIcon />
      </a>
    </div>
  );
};

const HeaderSearch = () => {
  const searchRef = useRef(null);
  const searchRunRef = useRef(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    const runId = searchRunRef.current + 1;
    searchRunRef.current = runId;

    if (!trimmedQuery) {
      setResults([]);
      setIsLoading(false);
      setHasError(false);
      return undefined;
    }

    setIsLoading(true);
    setHasError(false);

    const timeoutId = window.setTimeout(async () => {
      try {
        const pagefind = await loadPagefind();
        const response = await pagefind.search(trimmedQuery);
        const topResults = await Promise.all(
          response.results.slice(0, 6).map(async (result) => {
            const data = await result.data();

            return {
              excerpt: cleanExcerpt(data.excerpt || data.content),
              title: data.meta?.title || data.title || data.url,
              url: data.url,
            };
          })
        );

        if (searchRunRef.current === runId) {
          setResults(topResults);
          setIsLoading(false);
        }
      } catch (error) {
        if (searchRunRef.current === runId) {
          setResults([]);
          setIsLoading(false);
          setHasError(true);
        }
      }
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (results[0]?.url) {
      window.location.assign(results[0].url);
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const showDropdown = isOpen && query.trim();

  return (
    <div
      ref={searchRef}
      className="relative w-full sm:w-64"
      data-pagefind-ignore="all"
    >
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          value={query}
          placeholder="Search"
          className="h-10 w-full rounded-md border border-slate-300 bg-white px-9 text-sm font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-400/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500"
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeSearch();
              event.currentTarget.blur();
            }
          }}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={closeSearch}
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </form>

      {showDropdown && (
        <div
          id="site-search-results"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {isLoading ? (
            <div className="px-4 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              Searching
            </div>
          ) : hasError ? (
            <div className="px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-300">
              Search unavailable
            </div>
          ) : results.length ? (
            <ul className="max-h-96 overflow-y-auto py-2">
              {results.map((result) => (
                <li key={result.url}>
                  <a
                    href={result.url}
                    className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="block text-sm font-extrabold leading-snug text-slate-900 dark:text-white">
                      {result.title}
                    </span>
                    {result.excerpt && (
                      <span className="mt-1 block max-h-10 overflow-hidden text-xs leading-5 text-slate-600 dark:text-slate-300">
                        {result.excerpt}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full">
      <div className="container mx-auto p-6">
        <div className="max-w-screen-md mx-auto flex flex-col gap-6 sm:flex-row sm:gap-10 sm:items-center">
          <div className="flex items-center justify-between">
            <Link legacyBehavior href="/">
              <a aria-label="Maksim Ivanov home">
                <Logo
                  theme={theme}
                  className="h-6 from-logo-purple-start to-logo-purple-end dark:from-logo-green-start dark:to-logo-green-end"
                />
              </a>
            </Link>
            <HeaderActions
              theme={theme}
              setTheme={setTheme}
              className="sm:hidden"
            />
          </div>
          <div className="flex flex-grow w-full flex-col gap-4 sm:w-max sm:flex-row sm:items-center sm:justify-between">
            <nav className="sm:flex-shrink-0">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-10">
                {navigationLinks.map((item) => (
                  <NavItem key={item.title}>
                    {item.href.startsWith("http") ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      <Link legacyBehavior href={item.href}>
                        <a>{item.title}</a>
                      </Link>
                    )}
                  </NavItem>
                ))}
              </ul>
            </nav>
            <div className="flex w-full items-center gap-4 sm:w-auto">
              <HeaderSearch />
              <HeaderActions
                theme={theme}
                setTheme={setTheme}
                className="hidden flex-shrink-0 sm:flex"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
