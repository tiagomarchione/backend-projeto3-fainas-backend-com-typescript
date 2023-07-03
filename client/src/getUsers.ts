import type { User } from "./types";
import { axios } from "./useAxios";

type GetUsersOutPut = User[];

export async function getUsers() : Promise<GetUsersOutPut>{
    const response = await axios.get('/users');
    const users = response.data;
    return users
}