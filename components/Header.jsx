import { PrismicLink, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import NextImage from "next/image";
import { SunIcon } from "./SunIcon"

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};

export const Header = ({ navigation, settings }) => {
  return (
    <header className="w-full">
      <div className="container mx-auto px-6 py-3">
        <div className="max-w-screen-md mx-auto flex gap-6 items-center">
          {prismicH.isFilled.image(settings.data.logo) && (
            <PrismicLink href="/">
              <div className="h-8 w-32 mr-4 relative">
                <NextImage
                  src={prismicH.asImageSrc(settings.data.logo, {
                    w: undefined,
                    h: undefined,
                  })}
                  alt={settings.data.logo.alt}
                  layout="fill"
                  className="object-contain w-auto"
                />
              </div>
            </PrismicLink>
          )}
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
						<SunIcon/>
					</div>
        </div>
      </div>
    </header>
  );
};
