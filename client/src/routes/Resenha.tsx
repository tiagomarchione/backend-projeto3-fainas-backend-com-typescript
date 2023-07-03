import { useEffect, useState, useRef } from 'react';
import { getUsers } from '../getUsers';
import type { User, Resenha } from '../types';
import { UserItemResenha } from '../components/UserItem';
import { loadResenhaHistory } from '../loadResenhaHistory';
import { sendResenha } from '../sendResenha';
import { listenNewResenhaNotifications } from '../listenNewResenhaNotifications';
import toast from 'react-simple-toasts';

const initialUsers: User[] = [];
const initialResenhas: Resenha[] = [];
const initialCurrentUserResenha: User | null = null;

const texts = {
    resenhaPlaceholder: 'Resenha',
};

type MessageItemProps = {
    isReceiver: boolean;
    content: string;
};

function ResenhaView({ isReceiver, content } : MessageItemProps) {
    return (
        <>
            <div className={`${isReceiver ? 'ml' : 'mr'}-20 bg-${isReceiver ? 'green' : 'slate'}-800 text-white text-sm leading-tight p-3 m-2 rounded-${isReceiver ? 'l' : 'r'}-xl rounded-t-xl`} />
                {content}
            <div/>
        </>
    );
}

export function Resenha() {
    const [users, setUsers] = useState(initialUsers);
    const [resenhas, setResenhas] = useState(initialResenhas);
    const [resenhaToSend, setResenhaToSend] = useState('');
    const [currentUserResenha, setCurrentUserResenha] = useState(initialCurrentUserResenha);
    const currentUserResenhaRef = useRef(initialCurrentUserResenha);
    const resenhasRef = useRef(initialResenhas);
    const resenhasScrollRef = useRef<HTMLDivElement | null>();

    async function onLoadUsers() {
        const nextUsers = await getUsers();
        setUsers(nextUsers);
    }
    
    useEffect(() => {
        onLoadResenhas();
        currentUserResenhaRef.current = currentUserResenha;
    }, [currentUserResenha]);

    useEffect(() => {
        resenhasRef.current = resenhas;
        if(resenhasScrollRef.current !== null) {
            resenhasScrollRef.current?.scrollTo(0, resenhasScrollRef.current.scrollHeight);
        }
    }, [resenhas]);
    
    useEffect(() => {
        onLoadUsers();
        listenNewResenhaNotifications(resenha => {
            if(resenha.sender === currentUserResenhaRef.current?.id) {
                setResenhas([ ...resenhasRef.current, resenha ]);
            } else {
                toast(resenha.content.slice(0, 32).concat("..."));
            }
        });
    }, []);

    async function onLoadResenhas() {
        if(currentUserResenha === null) {
            return null;
        }

        const nextResenhas = await loadResenhaHistory(currentUserResenha.id);
        setResenhas(nextResenhas);
    }

    async function onSendResenha() {
        if(currentUserResenha === null) {
            return;    
        }

        setResenhaToSend("");
        const nextResenha : Resenha = {
            id: Date.now(),
            content: resenhaToSend,
            createdAt: new Date().toJSON(),
            sender: 0,
            receiver: currentUserResenha.id,
        };
        setResenhas([ ...resenhas, nextResenha ]);
        await sendResenha(resenhaToSend, currentUserResenha.id);
    }

    return (
        <div className="flex bg-slate-200 shadow-md rounded-xl m-4 p-10 max-w-screen-lg justify-center max-h-[calc(100%-220px)]">
            <div className="flex flex-col min-w-[256px] border-r overflow-auto">
                {users.map((user) => (
                    <div
                        className={`py-4 border-b-slate-300 border-b cursor-pointer hover:bg-green-200 ${currentUserResenha?.id === user.id ? 'bg-blue-400' : "" }`}
                        key={user.id}
                        onClick={() => setCurrentUserResenha(user)}
                    >

                        <UserItemResenha user={user} />
                    </div>
                ))}
            </div>
            <div className="flex-1 flex flex-col rounded-r-xl bg-slate-500 gap-3 p-3 overflow-auto">
                <div className='max-h-[100vh]' ref={ref => (resenhasScrollRef.current = ref)}>
                    {resenhas.map((resenha) => <ResenhaView key={resenha.id} isReceiver={resenha.sender === currentUserResenha?.id} content={resenha.content} />)}
                </div>
                <div className='m-3'>
                    <input
                    disabled={currentUserResenha === null}
                    type="text"
                    placeholder={texts.resenhaPlaceholder}
                    value={resenhaToSend}
                    onChange={(event) => setResenhaToSend(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && onSendResenha()}
                    className='w-full p-3 rounded-3xl outline-none'
                    />
                </div>
            </div>
        </div>
    );
}