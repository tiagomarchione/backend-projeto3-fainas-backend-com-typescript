import toast from "react-simple-toasts";
import { AuthToken } from "./authToken";
import { browserHistory } from "./browserHistory";

const texts = {
    logoutMessage: "Sua sessão foi finalizada com sucesso!",
};

export function Logout() {
    AuthToken.remove();
    toast(texts.logoutMessage);
    browserHistory.push("/");
};