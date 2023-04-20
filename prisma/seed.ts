import prisma from "../src/lib/prismadb";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Max Mustermann",
      email: "max.mustermann@test.de",
      image: "https://github.com/octocat.png",
    },
  });

  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Learn Next.js",
        userId: user.id,
      },
      {
        title: "Learn Playwright",
        userId: user.id,
      },
    ],
  });
}

main();
