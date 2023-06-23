import { useEffect, useState } from "react";
import { getMyself } from "../getMyself";
import { uploadUserPicture } from "../uploadUserPicture";
import toast from "react-simple-toasts";
import { loadUserPicture } from "../loadUserPicture";
import { TodoList } from "../components/TodoList";
import { GetMyselfOutPut } from "../getMyself";

const texts = {
    uploadUserPictureSuccess: 'Sua foto foi atualizada com sucesso!',
    uploadUserPictureFailure: 'Houve um erro ao enviar sua foto!',
}

const initialUser : GetMyselfOutPut = {
    isAuthenticated: false,
    id: 0,
    name: '',
    surname: '',
    email: '',
    userPicture: null,
    todolist: [],
};

export function Myself() {
    const [user, setUser] = useState(initialUser)
    useEffect(() => {
        getMyself().then((user) => {
            setUser(user);
        });
    }, []);

    async function onPictureSelect(event : React.ChangeEvent<HTMLInputElement>) {
        const picture = event.target.files?.[0];
        if(picture !== undefined) {
            const response = await uploadUserPicture(picture);
            if(response.success) {
                toast(texts.uploadUserPictureSuccess);
                setUser({ ...user, userPicture: `${response.pictureUrl}?${new Date().getTime()}` });
            } else {
                toast(texts.uploadUserPictureFailure);
            }
        }
    }

    return (
        <div className="max-w-screen-md m-4 gap-2">
            <input
                type="file"
                accept="image/jpeg"
                id="select-picture"
                className="hidden"
                onChange={onPictureSelect}
            />
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