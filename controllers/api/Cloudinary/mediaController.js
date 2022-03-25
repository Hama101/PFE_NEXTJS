import { CLOUDINARY_CONFIG } from '../../config'


//handel file upload to cloudinary
export const uploadFileToCouldinary = (file, setProgress) => {
    const cloudUrl = "https://api.cloudinary.com/v1_1/after-code/image/upload"
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', cloudUrl);

        //handel upload success
        xhr.onload = () => {
            const jsonResponse = JSON.parse(xhr.responseText);
            // return the secure_url
            // console.log("the response is : ", jsonResponse)
            resolve(jsonResponse);
        };
        //handel fail
        xhr.onerror = (event) => {
            const jsonResponse = JSON.parse(xhr.responseText);
            reject(event);
        }
        //handel file progress
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100;
                setProgress(Math.round(progress));
            }
        }
        //handel sending data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'I-FOOD');

        xhr.send(formData);
    });
}
//handel file delete from cloudinary
export const deleteFileFromCloudinary = (public_id) =>{
    console.log("delete file from cloudinary : ", public_id)
}
