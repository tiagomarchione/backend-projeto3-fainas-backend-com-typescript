import type { User, ToDoItem } from "./types";
import { axios } from "./useAxios";

export type GetMyselfOutPut = User & {
    todolist: ToDoItem[];
};

export async function getMyself() : Promise<GetMyselfOutPut> {
    const response = await axios.get('users/myself');
    return response.data;
};