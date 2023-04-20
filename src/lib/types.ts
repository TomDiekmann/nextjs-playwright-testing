export type Task = {
  id: string;
  title: string;
  completed: boolean;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};
