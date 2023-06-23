import Modal from "react-modal";
import { useState } from "react";
import { useGlobalStore } from "./useGlobalStore";
import axios from "axios";
import toast from "react-simple-toasts";

type RequestEmailVerificationCodeOutput = {
    success: boolean;
};

type VerifyEmailInput = string;

type VerifyEmailOutput = { success: boolean };

const texts = {
    modalTitle: "Verificação de Email",
    modalSubtitle(email: string) {
        return <>É necessário fazer a verificação do seu email. Digite o código que acabamos de enviar para o email <strong>{email}</strong>.</>
    },
    modalSubtitle2: "Lembre-se de olhar também a sua caixa de SPAM",
    codeLabel: "Código",
    codePlaceholder: "Digite o código",
    submitCodeButton: "Enviar",
    resendCodeText: "Caso não tenha recebido o email, ",
    resendeCodeLink: "solicite um novo código",
    emailResendSuccess: "Um novo código foi enviado para o seu email!",
    emailResendFailure: "Houve um erro ao enviar um novo código!",
    verifyEmailSuccess: "Seu email foi verificado com sucesso!",
    verifyEmailFailure: "Houve um erro ao verificar seu email Tente novamente!"
}

export function EmailVerificationModal() {
    const [codeForm, setCodeForm] = useState('');
    const user = useGlobalStore(state => state.user);
    const setUser = useGlobalStore(state => state.setUser);

    async function requestEmailVerificationCode() : Promise<RequestEmailVerificationCodeOutput> {
        const response = await axios.post<RequestEmailVerificationCodeOutput>(
            '/auth/request-email-verification-code'
        );
        const data = response.data;
        return data;
    }
    
    async function onRequestEmailVerificationCode() {
        const { success } = await requestEmailVerificationCode();
        if(success) {
            toast(texts.emailResendSuccess);
        } else {
            toast(texts.emailResendFailure);
        }
    }

    async function verifyEmail(codeForm: string) {
        const response = await axios.post<VerifyEmailOutput>('/auth/verify-email', { codeForm });
        const data = response.data;
        return data;
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { success } = await verifyEmail(codeForm);
        if(success) {
            setUser({ isEmailVerified: 1 }) 
            toast(texts.verifyEmailSuccess);
        } else {
            toast(texts.verifyEmailFailure);
        }
    }
    
    const isOpen = user.isAuthenticated === true && user.isEmailVerified === 0;
    return (
        <Modal isOpen={isOpen}>
            <div>
                <h2 className="font-bold text-3xl text-center py-4 border-b-2 border-b-slate-400">{texts.modalTitle}</h2>
                <p className="text-xl py-2" >{texts.modalSubtitle(user.email)}</p>
                <p className="text-gray-600 pb-4">{texts.modalSubtitle2}</p>
                <form noValidate onSubmit={onSubmit}>
                    <label className="font-bold mt-6" htmlFor="">{texts.codeLabel}</label>
                    <input
                        type="number"
                        className="border-2 border-slate-400 rounded-md px-2 py-1 w-full"
                        placeholder={texts.codePlaceholder}
                        value={codeForm}
                        onChange={event => setCodeForm(event.target.value)}
                    />
                    <p className="text-[#12154e] text-lg pb-4">{texts.resendCodeText}
                        <button
                            className="text-blue-500 hover:text-blue-700 font-bold underline py-1 px-1 cursor-pointer"
                            onClick={onRequestEmailVerificationCode}
                        >
                            {texts.resendeCodeLink}
                        </button>
                    </p>
                    <button
                        type="submit"
                        // disabled={disabled}
                        className=" self-center bg-blue-500 hover:bg-blue-700 text-2xl text-white px-4 py-2 font-bold rounded-lg w-full mt-6"
                    >
                        {texts.submitCodeButton}
                    </button> 
                </form>
            </div>
        </Modal>
    );
}