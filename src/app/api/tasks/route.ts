import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const { title } = await request.json();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  const task = await prisma.task.create({
    data: {
      title,
      user: {
        connect: {
          email: user?.email,
        },
      },
    },
  });
  return NextResponse.json(task);
}
