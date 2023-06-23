import type { ToDoItem, User } from "./types";
import { axios } from "./useAxios";

export type GetUserOutPut = User & {
    todolist: ToDoItem[];
};

export async function getUser(userId: number) : Promise<GetUserOutPut> {
    const response = await axios.get(`/users/${userId}`);
    const user = response.data;
    return user;
}