import type { User } from "../types";
import { loadUserPicture } from "../loadUserPicture";

export type UserItemProps = {
    user: User ;
}

export function UserItem({ user } : UserItemProps) {
    return (    
        <a href={`/usuario/${user.id}`} className="flex flex-row gap-3 items-center cursor-pointer">
            <img src={loadUserPicture(user.userPicture)} className="rounded-full w-10" />
            <span className="font-bold text-lg ">
                {user.name} {user.surname}
            </span>
        </a>
    )
}

export function UserItemResenha({ user } : UserItemProps) {
    return (    
        <div className="flex flex-row gap-3 items-center cursor-pointer">
            <img src={loadUserPicture(user.userPicture)} className="rounded-full w-10" />
            <span className="font-bold text-lg ">
                {user.name} {user.surname}
            </span>
        </div>
    )
}