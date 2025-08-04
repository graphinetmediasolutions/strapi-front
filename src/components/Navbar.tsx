"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { MAIN_MENU_QUERY } from "@/graphql/mainMenu";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface NavigationLevel3 {
  title: string;
}

interface NavigationLevel2 {
  title: string;
  items?: NavigationLevel3[];
}

interface NavigationLevel1 {
  title: string;
  items?: NavigationLevel2[];
}

export interface NavigationData {
  renderNavigation: {
    title: string;
    items: NavigationLevel1[];
  }[];
}


const getLocalizedTitle = (
  item: { title: string; additionalFields?: { locale_title?: string } },
  locale: string
): string => {
  if (locale === "en") return item.title;
  return item.additionalFields?.locale_title || item.title;
};

const Navbar: React.FC = () => {


  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const { data, loading, error } = useQuery<NavigationData>(MAIN_MENU_QUERY);

  console.log("Navigation Data:", data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const roots = data?.renderNavigation;
  

  return (
    <nav className="bg-gray-900 py-3 flex items-center justify-center px-7">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList>
            {roots?.map((root) => (
              <NavigationMenuItem key={getLocalizedTitle(root, locale)}>
                {root.items && root.items.length > 0 ? (
                  <>
                    <NavigationMenuTrigger>{getLocalizedTitle(root, locale)}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white text-black rounded-md shadow-lg">
                      <div className="max-w-4xl w-[800px] p-6 grid grid-cols-3 gap-6">
                        {root.items.map((level1) => (
                          <div key={getLocalizedTitle(level1, locale)} className="col-span-1">
                            <h4 className="font-semibold mb-2">{getLocalizedTitle(level1, locale)}</h4>
                            {level1.items?.map((level2) => (
                              <div key={getLocalizedTitle(level2, locale)} className="mb-3">
                                <div className="text-gray-700 font-medium">{getLocalizedTitle(level2, locale)}</div>
                                <ul className="ml-2 space-y-1 text-sm">
                                  {level2.items?.map((level3) => (
                                    <li key={getLocalizedTitle(level3, locale)}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={`/${getLocalizedTitle(level3, locale)
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`}
                                        >
                                          {getLocalizedTitle(level3, locale)}
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/${getLocalizedTitle(root, locale).toLowerCase().replace(/\s+/g, "-")}`}
                      className="px-4 py-2 text-white hover:underline"
                    >
                      {getLocalizedTitle(root, locale)}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <LocaleSwitcher />
    </nav>
  );
};

export default Navbar;
