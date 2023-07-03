import { axios } from "./useAxios";
import type { Resenha } from "./types";

export async function sendResenha(content: string, receiverId: number): Promise<Resenha> {
    const response = await axios.post(`resenhas/${receiverId}`, { content });
    return response.data;
}