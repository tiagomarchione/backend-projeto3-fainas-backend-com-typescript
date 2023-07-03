export function loadUserPicture(userPicture: string | null) {
    if(!userPicture) {
        return "/anonimous-avatar.png";
    } else if(userPicture?.startsWith('http')) {
        return userPicture;
    } else {
        return `${process.env.REACT_APP_API_URL}/${userPicture}`;
    }
}
