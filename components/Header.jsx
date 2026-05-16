import Link from "next/link";
import { SunIcon } from "./SunIcon";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";
import { RSSIcon } from "./RSSIcon";

const navigationLinks = [
  { href: "/posts/", title: "Posts" },
  { href: "/projects/", title: "Projects" },
  { href: "/search/", title: "Search" },
  { href: "/about/", title: "About" },
  { href: "https://www.youtube.com/user/satansdeer1/videos", title: "Videos" },
];

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
          <div className="flex flex-grow w-full justify-between sm:w-max">
            <nav>
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
            <HeaderActions
              theme={theme}
              setTheme={setTheme}
              className="hidden sm:flex"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
