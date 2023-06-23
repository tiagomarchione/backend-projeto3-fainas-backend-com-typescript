import { useEffect, useState } from "react";
import { getUser } from "../getUser";
import { GetUserOutPut } from "../getUser";
import { TodoList } from "../components/TodoList";
import { loadUserPicture } from "../loadUserPicture";
import { useParams } from "react-router-dom";

const initialUser : GetUserOutPut = {
    isAuthenticated: false,
    id: 0,
    name: '',
    surname: '',
    email: '',
    userPicture: null,
    todolist: [],
};

export function UserView() {
    const params = useParams();
    const userId = Number(params.id);
    const [user, setUser] = useState(initialUser)
    useEffect(() => {
        getUser(userId).then((user) => {
            setUser(user);
        });
    }, [userId]);

    
    return (
        <div className="max-w-screen-md m-4 gap-2">
           
            <label htmlFor="select-picture"className="cursor-pointer">
                <img    
                    src={loadUserPicture(user.userPicture)}
                    className="w-48 h-48 rounded-full"
                />
            </label>
            <h2 className="font-bold text-2xl">
                {user.name} {user.surname}    
            </h2>
            <TodoList todoList={user.todolist} getTodo={() => undefined } />
        </div>
    );
};