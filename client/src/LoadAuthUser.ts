import { useGlobalStore } from "./useGlobalStore";
import { useEffect } from "react";
import { getUser } from "./components/LoginCard";
import { AuthToken } from "./authToken";


export function LoadAuthUser() {
    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);
    useEffect (() => {
        const token = AuthToken.get();
        if(!token || user.isAuthenticated) {
            return;
        }
        getUser().then(user => {
            setUser({ ...user, isAuthenticated: true });
        });
    }, [user]);
    return null;
}