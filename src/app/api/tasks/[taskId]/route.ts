import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const { completed } = await request.json();

  const task = await prisma.task.update({
    where: {
      id: params.taskId,
    },
    data: {
      completed,
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(
  request: Request,
  { params }: { params: { taskId: string } }
) {
  const task = await prisma.task.delete({
    where: {
      id: params.taskId,
    },
  });

  return NextResponse.json(task);
}
