import { axios } from "./useAxios";

type UploadUserPicture = {
    success: boolean;
    pictureUrl: string | null;
};

export async function uploadUserPicture(picture: File) : Promise<UploadUserPicture> {
    const formData = new FormData();
    formData.append('file', picture);
    const response = await axios.post('/users/upload-picture', formData, {
        headers: {
            "Content-Type": 'multipart/for-data',
        }
    });

    return response.data;
}