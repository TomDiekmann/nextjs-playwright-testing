import { baseURL } from "./config";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  user: User;
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${baseURL}/tasks`, {
    cache: "no-store",
  });
  const tasks = await response.json();

  return tasks;
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await fetch(`${baseURL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });

  return response.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${baseURL}/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: task.completed,
    }),
  });

  return response.json();
};

export const deleteTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${baseURL}/tasks/${task.id}`, {
    method: "DELETE",
  });

  return response.json();
};
