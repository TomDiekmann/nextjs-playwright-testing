"use client";

import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/lib/api/tasks";
import { Task } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

const TaskView = ({ tasks }: { tasks: Task[] }) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const addTask = async () => {
    setIsFetching(true);
    // Mutate external data source
    await createTask(textInput);
    setIsFetching(false);
    setTextInput("");

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
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Input task here..."
          disabled={isFetching}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          data-testid="task-input"
        />
        <Button
          type="submit"
          disabled={isFetching}
          onClick={() => addTask()}
          className="w-24"
          data-testid="add-button"
        >
          <Loader2
            className={`mr-2 h-4 w-4 animate-spin ${
              isFetching ? "" : "hidden"
            }`}
          />
          Add
        </Button>
      </div>
    </div>
  );
};

export default TaskView;
