import { useNavigate } from "react-router-dom";
import { AuthToken } from "../authToken";
import { axios, useAxios } from "../useAxios"
import { useState } from "react";
import { useGlobalStore } from "../useGlobalStore";
import type { User} from "../types"
import toast from "react-simple-toasts";


type LoginOutput = {
    accessToken: string;
    user: User;
};

type GetUserOutput = User;

const texts = {
    title: "Criar Faina",
    subtitle: "Entre na sua conta e gerencie suas ",
    subtitleSpan: "Fainas",
    noAccount: "Não tem uma Conta? ",
    createAccountSpan: "Criar Conta",
    emailLabel: "Email",
    emailPlaceholder: "Digite o seu email",
    passwordLabel: "Senha",
    passwordPlaceholder: "Digite a sua senha",
    submitButton: "Entrar",
    submitSucess: "Sua Faina foi criada com sucesso!",
    submitFailure: "Não foi possível cria sua Faina devido a um erro",
    invalidCredentialsError: "Email ou Senha são inválidos. Tente novamente.", 
};

const initialLoginForm = {
    email: '',
    password: ''
};


export async function login (email: string, password: string): Promise<LoginOutput | null > {
    try{
        const response = await axios.post("/auth/login", {
            email,
            password,
        },
        {
            validateStatus(status) {
                if(status <= 401) {
                    return true;
                }
                return false;
            }
        });

        if(response.status >= 400) {
            return null;
        }
        return response.data;
    }catch(exception){
        return null;
    };
}

export async function getUser (): Promise<GetUserOutput> {
    const response = await axios.get("/auth/user");
    const user = response.data;
    return user;
}

export function LoginCard() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const setUser = useGlobalStore(state => state.setUser);

    async function onSubmit (event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { email, password } = loginForm;
        const response = await login(email, password);
        if (response !== null) {    
            const { accessToken , user} = response;
            AuthToken.set(accessToken);
            setUser({ ...user, isAuthenticated: true });
            navigate('/usuario');
        } else {
            toast(texts.invalidCredentialsError)
        }
    }

    return(
        <section className='flex flex-row w-2/3 max-w-[600px] justify-center p-6'>
            <div className="bg-slate-200 shadow-md rounded-xl p-3 w-11/12 justify-center">
                <div className="flex flex-row justify-evenly w-full">
                        <div className="flex flex-col p-4 gap-4 text-left">
                            <img src="/logo.png" alt="" className="w-2/3 self-center p-4"/>
                            <h2 className="font-bold text-4xl px-4"><span className="bg-slate-300 text-[#12154e] py-0 px-1">Entrar</span></h2>
                            <p className="text-[#7b7b7b] text-md px-4">{texts.subtitle} <span className="bg-slate-300 text-[#12154e] py-0 px-1">{texts.subtitleSpan}</span></p>
                            <p className="text-[#12154e] text-lg py-4 px-4">{texts.noAccount} <a href="/criar-conta" className="text-blue-500 hover:text-blue-700 font-bold underline py-4 px-1">{texts.createAccountSpan}</a></p> 
                            <form onSubmit={onSubmit}>
                                <label className="font-bold mt-6" htmlFor="">{texts.emailLabel}</label>
                                <input
                                    type="email"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.emailPlaceholder}
                                    value={loginForm.email}
                                    onChange={event => setLoginForm({ ...loginForm, email: event.target.value })}
                                />
                                <label className="font-bold mt-6" htmlFor="">{texts.passwordLabel}</label>
                                <input
                                    type="password"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.passwordPlaceholder}
                                    value={loginForm.password}
                                    onChange={event => setLoginForm({ ...loginForm, password: event.target.value })}
                                />
                                <button
                                    type="submit"
                                    // disabled={disabled}
                                    className=" self-center bg-blue-500 hover:bg-blue-700 text-2xl text-white px-4 py-2 font-bold rounded-lg w-full mt-6"
                                >
                                    {texts.submitButton}
                                </button> 

                            </form>
                        </div>
                          
                </div>          
            </div>
        </section>
    )
}