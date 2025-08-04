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

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const { data, loading, error } = useQuery<NavigationData>(MAIN_MENU_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const roots = data?.renderNavigation;

  return (
     <nav className="bg-gray-900 py-3 flex items-center justify-center px-4">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList>
            {roots?.map((root) => (
              <NavigationMenuItem key={root.title}>
                {root.items && root.items.length > 0 ? (
                  <>
                    <NavigationMenuTrigger>{root.title}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white text-black rounded-md shadow-lg">
                      <div className="max-w-4xl w-[800px] p-6 grid grid-cols-3 gap-6">
                        {root.items.map((level1) => (
                          <div key={level1.title} className="col-span-1">
                            <h4 className="font-semibold mb-2">{level1.title}</h4>
                            {level1.items?.map((level2) => (
                              <div key={level2.title} className="mb-3">
                                <div className="text-gray-700 font-medium">{level2.title}</div>
                                <ul className="ml-2 space-y-1 text-sm">
                                  {level2.items?.map((level3) => (
                                    <li key={level3.title}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={`/${level3.title
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}`}
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
                      href={`/${root.title.toLowerCase().replace(/\s+/g, "-")}`}
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
