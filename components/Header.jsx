import Link from "next/link";
import { SunIcon } from "./SunIcon";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";
import { RSSIcon } from "./RSSIcon";

const navigationLinks = [
  { href: "/posts/", title: "Posts" },
  { href: "/categories/javascript/", title: "Javascript" },
  { href: "/categories/react/", title: "React" },
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

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full">
      <div className="container mx-auto p-6">
        <div className="max-w-screen-md mx-auto flex gap-10 items-center">
          <Link href="/">
            <a aria-label="Maksim Ivanov home">
              <Logo
                theme={theme}
                className="h-6 from-logo-purple-start to-logo-purple-end dark:from-logo-green-start dark:to-logo-green-end"
              />
            </a>
          </Link>
          <div className="flex flex-grow w-max justify-between">
            <nav>
              <ul className="flex flex-wrap gap-10">
                {navigationLinks.map((item) => (
                  <NavItem key={item.title}>
                    {item.href.startsWith("http") ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      <Link href={item.href}>
                        <a>{item.title}</a>
                      </Link>
                    )}
                  </NavItem>
                ))}
              </ul>
            </nav>
            <div className="flex gap-4 items-center">
              <SunIcon
                checked={theme !== "light"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-6 w-6"
              />
              <Link href="/rss.xml">
                <a aria-label="RSS feed">
                  <RSSIcon />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
