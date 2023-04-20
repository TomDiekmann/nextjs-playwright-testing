import { getTasks } from "@/lib/api/tasks";
import React from "react";
import TaskView from "./TaskView";

const ProtectedPage = async () => {
  const tasks = await getTasks();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-96 flex flex-col items-center gap-4">
        <h1 className="text-xl">Tasks</h1>
        <TaskView tasks={tasks} />
      </div>
    </div>
  );
};

export default ProtectedPage;
