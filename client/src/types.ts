export type ToDo = {
    id?: number;
    title: string;
    description: string;
    deadline: string;
    createdAt: string;
    category: string;
    user: number;
};

export type User = {
    id: number,
    isAuthenticated: boolean,
    name: string,
    surname: string,
    email: string,
    userPicture: string | null;
};

export type Resenha = {
    id: number,
    content: string,
    sender: number,
    receiver: number,
    createdAt: string,
}

export type ToDoItem = ToDo & { user?: User };