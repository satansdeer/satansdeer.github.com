import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { SunIcon } from "./SunIcon";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";
import { RSSIcon } from "./RSSIcon";
import { CategoriesDropdown } from "./CategoriesDropdown";

const NavItem = ({ children, item }) => {
  return (
    <li className="flex gap-2 items-center font-semibold tracking-tight text-slate-800 dark:text-slate-200">
      {children}
      {/* {item.title === "Posts" && <CategoriesDropdown />} */}
    </li>
  );
};

export const Header = ({ navigation, settings }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full">
      <div className="container mx-auto p-6">
        <div className="max-w-screen-md mx-auto flex gap-10 items-center">
          {prismicH.isFilled.image(settings.data.logo) && (
            <PrismicLink href="/">
              <Logo
                theme={theme}
                className="h-6 from-logo-purple-start to-logo-purple-end dark:from-logo-green-start dark:to-logo-green-end"
              />
            </PrismicLink>
          )}
          <div className="flex flex-grow w-max justify-between">
            <nav>
              <ul className="flex flex-wrap gap-10">
                {navigation.data?.links.map((item) => (
                  <NavItem key={item.title} item={item}>
                    <PrismicLink field={item.url}>{item.title}</PrismicLink>
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
              <PrismicLink href="/feed">
                <RSSIcon />
              </PrismicLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
