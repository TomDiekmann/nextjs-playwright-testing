"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { UserNav } from "./UserNav";
import { Button } from "./ui/button";

const NavigationBar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full border-b p-2 flex flex-row items-center px-4">
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Startseite
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/protected" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Protected
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row ml-auto h-full items-center">
        {session && session.user ? (
          <div>
            <UserNav
              user={{
                name: session.user.name!,
                email: session.user.email!,
                image: session.user.image!,
              }}
            />
          </div>
        ) : (
          <Button onClick={() => signIn()}>Einloggen</Button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
