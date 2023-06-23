export type ErrorToastProps = {
    message: React.ReactNode
}

export function ErrorToast({ message } : ErrorToastProps) {
    return (
        <div className="bg-red-400 text-red-600 rounded-lg p-2">{message}</div>
    );
}