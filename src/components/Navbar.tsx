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

// TypeScript Interfaces
interface MenuItem {
  title: string;
  url?: string;
  order?: number;
  locale?: string;
  localizations?: {
    locale: string;
    title: string;
    url?: string;
  }[];
  children?: MenuItem[];
}
interface HeaderData {
  header: {
    menuItems: MenuItem[];
    locale: string;
    localizations: {
      locale: string;
      menuItems: MenuItem[];
    }[];
  };
}


function localizeMenuItems(items: MenuItem[], locale: string): MenuItem[] {
  return items.map((item) => {
    const localized = item.localizations?.find((l) => l.locale === locale);

    // Recursively localize children
    const localizedChildren = item.children
      ? localizeMenuItems(item.children, locale)
      : [];

    return {
      ...item,
      title: localized?.title || item.title,
      url: localized?.url || item.url,
      children: localizedChildren,
    };
  });
}
const Navbar: React.FC = () => {

  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";

  const { data, loading, error } = useQuery<HeaderData>(MAIN_MENU_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const menuItems = localizeMenuItems(data?.header?.menuItems || [], currentLocale);

  // const menuItems = data?.header?.menuItems || [];
    





  return (
    <nav className="bg-gray-900 py-3 flex items-center justify-center px-7">
  <div className="container mx-auto px-4">
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((root) => (
          <NavigationMenuItem key={root.title}>
            {root.children && root.children.length > 0 ? (
              <>
                <NavigationMenuTrigger className="text-white bg-gray-800">
                  {root.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-800 text-white rounded-md shadow-lg">
                  <div className="max-w-4xl w-[800px] p-6 grid grid-cols-3 gap-6">
                    {root.children.map((level1) => (
                      <div key={level1.title} className="col-span-1">
                        <h4 className="font-semibold mb-2 text-gray-100">
                          {level1.title}
                        </h4>
                        {level1.children?.map((level2) => (
                          <div key={level2.title} className="mb-3">
                            <div className="text-gray-200 font-medium">
                              {level2.title}
                            </div>
                            <ul className="ml-2 space-y-1 text-sm text-gray-300">
                              {level2.children?.map((level3) => (
                                <li key={level3.title}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={level3.url || "#"}
                                      className="hover:underline"
                                    >
                                      {level3.title}
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
                  href={root.url || "#"}
                  className="px-4 py-2 text-white hover:underline"
                >
                  {root.title}
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
