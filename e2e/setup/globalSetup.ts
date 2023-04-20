import { BrowserContext, chromium } from "@playwright/test";
import path from "node:path";
import prisma from "../../src/lib/prismadb";
import { encode } from "next-auth/jwt";

const sessionToken = "d52f0c50-b8e3-4326-b48c-4d4a66fdeb64";

type Cookie = Parameters<BrowserContext["addCookies"]>[0][0];

export default async function globalSetup() {
  const testCookie: Cookie = {
    name: "next-auth.session-token",
    value: await encode({
      token: {
        name: "E2E Test User",
        email: "e2e@e2e.com",
        image: "",
        sub: "clgodbjcn0000y2765geepksc",
        uid: "clgodbjcn0000y2765geepksc",
      },
      secret: process.env.NEXTAUTH_SECRET!,
    }),
    domain: "localhost",
    path: "/",
    expires: -1, // expired => forces browser to refresh cookie on test run
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };

  const now = new Date();

  await prisma.user.upsert({
    where: {
      email: "e2e@e2e.com",
    },
    create: {
      id: "clgodbjcn0000y2765geepksc",
      name: "E2E Test User",
      email: "e2e@e2e.com",
      image: "https://github.com/octocat.png",
      sessions: {
        create: {
          // create a session in db that hasn't expired yet, with the same id as the cookie
          expires: new Date(now.getFullYear(), now.getMonth() + 1, 0),
          sessionToken: sessionToken,
        },
      },
      accounts: {
        // some random mocked discord account
        create: {
          type: "oauth",
          provider: "google",
          providerAccountId: "123456789",
          access_token: "ggg_zZl1pWIvKkf3UDynZ09zLvuyZsm1yC0YoRPt",
          token_type: "bearer",
          scope: "",
        },
      },
    },
    update: {},
  });

  const storageState = path.resolve(__dirname, "storageState.json");
  const browser = await chromium.launch();
  const context = await browser.newContext({ storageState });
  await context.addCookies([testCookie]);
  await context.storageState({ path: storageState });
  await browser.close();
}
