export type ToDo = {
    id?: number;
    title: string;
    description: string;
    deadline: string;
    createdAt: string;
    category: string;
    userId: number;
};

export type User = {
    id: number,
    isAuthenticated: boolean,
    name: string,
    surname: string,
    email: string,
    userPicture: string | null;
};

export type ToDoItem = ToDo & { user?: User };