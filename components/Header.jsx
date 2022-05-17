import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import NextImage from "next/image";
import { SunIcon } from "./SunIcon";
import { Logo } from "./Logo";
import { useTheme } from "next-themes";

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800 dark:text-slate-200">
      {children}
    </li>
  );
};

export const Header = ({ navigation, settings }) => {
  const { theme, setTheme } = useTheme();

  console.log(theme);

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
                  <NavItem key={item.title}>
                    <PrismicLink field={item.url}>{item.title}</PrismicLink>
                  </NavItem>
                ))}
              </ul>
            </nav>
            <div>
              <SunIcon
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
