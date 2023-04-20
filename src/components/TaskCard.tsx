"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Task } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
import { deleteTask, updateTask } from "@/lib/api/tasks";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [checked, setChecked] = useState(task.completed);

  async function handleChange() {
    setIsFetching(true);
    setChecked(!checked);
    // Mutate external data source
    await updateTask({ ...task, completed: !task.completed });
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();

      // Note: If fetch requests are cached, the updated data will
      // produce the same result.
    });
  }

  async function handleDelete() {
    setIsDeleting(true);
    // Mutate external data source
    await deleteTask(task);

    startTransition(() => {
      router.refresh();
    });

    setIsDeleting(false);
  }

  return (
    <div
      className="flex flex-col gap-2 p-4 rounded border w-full"
      key={task.id}
      data-testid="task-card"
    >
      <div className="flex flex-row gap-2 items-center">
        <img
          src={task.user.image}
          width={16}
          height={16}
          alt="UserImage"
          className="rounded-full"
        />
        <span className="text-sm text-gray-500" data-testid="task-user-email">
          {task.user.email}
        </span>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Checkbox
          checked={checked}
          onCheckedChange={handleChange}
          disabled={isPending}
        />
        <h2
          className={`text-lg font-medium ${checked ? "line-through" : ""}`}
          data-testid="task-title"
        >
          {task.title}
        </h2>
        <div
          className="p-1 ml-auto cursor-pointer hover:bg-gray-100 rounded"
          onClick={() => !isDeleting && handleDelete()}
          data-testid="task-delete"
        >
          {isDeleting ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Trash2 className="" size={16} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
