import { useNavigate } from "react-router-dom";
import { Link } from "./Link";
import { initialUser, useGlobalStore } from "../useGlobalStore";
import { Logout } from "../Logout";
import { UserItem } from "./UserItem";

const texts = {
    titlle: "Fainas",
    home: "Página Inicial",
    todoContainer: "Fainas",
    newFaina: "Nova Faina",
    login: "Entrar",
    createAccount: "Criar Conta",
    logout: "Sair",
    resenha: "Resenha",
}

export function Navbar() {
    const navigate = useNavigate();
    const user = useGlobalStore(state => state.user);
    const setUser = useGlobalStore(state => state.setUser);

function onLogout() {
    setUser(initialUser);
    Logout();
};

    return (
        <header className="flex flex-row p-3 bg-slate-300 justify-between shadow-lg max-w-full min-h-[10vh]">
            <div className="flex flex-row self-center gap-10">
                <a href="/" className="flex flex-row gap-2 text-2xl">
                    <img src="/logo.png" alt="" className="w-10 self-center"/>
                    <span className="font-bold text-[#12154e] uppercase self-center">{texts.titlle}</span>
                </a>
            </div>
            <div className="flex flex-row self-center gap-4 p-3">
                <nav className="self-center">
                    <Link to="/">{texts.home}</Link>
                    <Link to="/fainas">{texts.todoContainer}</Link>
                </nav>
                
                {user.isAuthenticated === false && (
                    <button
                        onClick={() => {
                            navigate("/login")
                        }}
                        className=" self-center bg-blue-500 hover:bg-blue-700 text-sm text-white px-4 py-2 font-bold rounded-lg">{texts.login}
                    </button>
                )}
                {user.isAuthenticated === true && (
                    <>
                        <button
                            onClick={() => {
                                navigate("/criar-faina")
                            }}
                            className=" self-center bg-green-500 hover:bg-green-700 text-sm text-white px-4 py-2 font-bold rounded-lg">{texts.newFaina}
                        </button>
                        <button
                            onClick={() => {
                                navigate("/resenha")
                            }}
                            className=" self-center bg-green-500 hover:bg-green-700 text-sm text-white px-4 py-2 font-bold rounded-lg">{texts.resenha}
                        </button>
                        <div className="flex flex-row self-center gap-4  text-blue-600 hover:text-blue-800">
                            <a href="/usuario" className="flex flex-row gap-2">
                                <UserItem user={user} />
                            </a>
                        </div>
                        <button
                            onClick={onLogout} className=" self-center bg-blue-500 hover:bg-blue-700 text-sm text-white px-4 py-2 font-bold rounded-lg">{texts.logout}
                        </button>
                    </>
                )}
            </div>
        </header>
    )
};
