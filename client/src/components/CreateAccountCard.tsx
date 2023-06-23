import { useNavigate } from "react-router-dom";
import { AuthToken } from "../authToken";
import { axios, useAxios } from "../useAxios"
import { useState } from "react";
import { useGlobalStore } from "../useGlobalStore";
import type { User} from "../types"
import toast from "react-simple-toasts";


type CreateAccountInput = {
    name: string,
    surname: string,
    email: string,
    password: string,
};

type CreateAccountOutput = {
    success: true,
    accessToken: string;
    user: User;
};

const texts = {
    title: "Criar conta",
    subtitle: "Crie sua conta para começar a gerenciar suas ",
    subtitleSpan: "Fainas",
    nameLabel: "Nome",
    namePlaceholder: "Digite o seu nome",
    surnameLabel: "Sobrenome",
    surnamePlaceholder: "Digite o seu sobrenome",
    emailLabel: "Email",
    emailPlaceholder: "Digite o seu email",
    passwordLabel: "Senha",
    passwordPlaceholder: "Digite a sua senha",
    confirmPasswordLabel: "Corfirme sua senha",
    confirmPasswordPlaceholder: "Digite a sua senha novamente",
    submitButton: "Criar",
    submitSuccess: "Sua conta foi criada com sucesso!",
    submitFailure: "Não foi possível cria sua conta devido a um erro",
    invalidCredentialsError: "Email ou Senha são inválidos. Tente novamente.", 
};

const initialCreateAccountForm = {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
};


// export async function createAccount () {
//     try{
//         const response = await axios.post("/auth/login", {
//             email,
//             password,
//         },
//         {
//             validateStatus(status) {
//                 if(status <= 401) {
//                     return true;
//                 }
//                 return false;
//             }
//         });

//         if(response.status >= 400) {
//             return null;
//         }
//         return response.data;
//     }catch(exception){
//         return null;
//     };
// }

export async function createAccount (createAccountInput : CreateAccountInput): Promise<CreateAccountOutput> {
    const response = await axios.post("/auth/create-account", createAccountInput);
    const user = response.data;
    return user;
}

export function CreateAccountCard() {
    const navigate = useNavigate();
    const [createAccountForm, setCreateAccountForm] = useState(initialCreateAccountForm);
    const setUser = useGlobalStore(state => state.setUser);

    async function onSubmit (event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { confirmPassword, ...createAccountData } = createAccountForm;
        const response = await createAccount(createAccountData);
        if(response.success === true) {
            AuthToken.set(response.accessToken);
            setUser(response.user);
            toast(texts.submitSuccess);
            navigate('/usuario');
        }
    }

    return(
        <section className='flex flex-row w-2/3 max-w-[600px] justify-center p-6'>
            <div className="bg-slate-200 shadow-md rounded-xl p-3 w-11/12 justify-center">
                <div className="flex flex-row justify-evenly w-full">
                        <div className="flex flex-col p-4 gap-4 text-left">
                            <img src="/logo.png" alt="" className="w-2/3 self-center p-4"/>
                            <h2 className="font-bold text-4xl px-4"><span className="bg-slate-300 text-[#12154e] py-0 px-1">Criar conta</span></h2>
                            <p className="text-[#7b7b7b] text-md px-4">{texts.subtitle} <span className="bg-slate-300 text-[#12154e] py-0 px-1">{texts.subtitleSpan}</span></p>
                            <form onSubmit={onSubmit}>
                                <label className="font-bold mt-6" htmlFor="">{texts.nameLabel}</label>
                                <input
                                    type="text"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.namePlaceholder}
                                    value={createAccountForm.name}
                                    onChange={event => setCreateAccountForm({ ...createAccountForm, name: event.target.value })}
                                />
                                <label className="font-bold mt-6" htmlFor="">{texts.surnameLabel}</label>
                                <input
                                    type="text"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.surnamePlaceholder}
                                    value={createAccountForm.surname}
                                    onChange={event => setCreateAccountForm({ ...createAccountForm, surname: event.target.value })}
                                />
                                <label className="font-bold mt-6" htmlFor="">{texts.emailLabel}</label>
                                <input
                                    type="email"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.emailPlaceholder}
                                    value={createAccountForm.email}
                                    onChange={event => setCreateAccountForm({ ...createAccountForm, email: event.target.value })}
                                />
                                <label className="font-bold mt-6" htmlFor="">{texts.passwordLabel}</label>
                                <input
                                    type="password"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.passwordPlaceholder}
                                    value={createAccountForm.password}
                                    onChange={event => setCreateAccountForm({ ...createAccountForm, password: event.target.value })}
                                />
                                <label className="font-bold mt-6" htmlFor="">{texts.confirmPasswordLabel}</label>
                                <input
                                    type="password"
                                    className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                                    placeholder={texts.confirmPasswordPlaceholder}
                                    value={createAccountForm.confirmPassword}
                                    onChange={event => setCreateAccountForm({ ...createAccountForm, confirmPassword: event.target.value })}
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