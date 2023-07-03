import { axios } from "./useAxios";
import type { Resenha } from "./types";

export async function loadResenhaHistory(receiverId: number) : Promise<Resenha[]> {
    const response = await axios.get(`/resenhas/${receiverId}`);
    return response.data;
}