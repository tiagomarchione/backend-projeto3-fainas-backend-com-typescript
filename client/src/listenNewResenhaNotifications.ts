import { fetchEventSource } from "@microsoft/fetch-event-source";
import { AuthToken } from "./authToken";
import type { Resenha } from "./types";

export async function listenNewResenhaNotifications(onResenha : (resenha : Resenha) => void) {
    const token = AuthToken.get();
    await fetchEventSource(`${process.env.REACT_APP_API_URL}/resenhas/sse/notifications`, {
        onmessage(data) {
            if(data && data.data) {
                const resenha = JSON.parse(data.data);
                onResenha(resenha);
            }
            console.log(data);
        },
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}