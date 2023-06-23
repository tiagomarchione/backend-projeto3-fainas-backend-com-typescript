export function loadUserPicture(userPicture: string | null) {
    if(!userPicture) {
        return "/anonimous-avatar.png";
    } else if(userPicture?.startsWith('http')) {
        return userPicture;
    } else {
        return `http://localhost/8080${userPicture}`;
    }
}
