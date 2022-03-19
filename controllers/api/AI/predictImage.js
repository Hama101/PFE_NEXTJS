const BASE_LIVE_URL = "https://sea-of-food.herokuapp.com";


// TODO: refactor this code!!

//this used to resize image
const resizeImage = async (image) => {
    const manipResult = await ImageManipulator.manipulateAsync(
        image.localUri || image.uri,
        [{ resize: { width: image.width * 0.5, height: image.height * 0.5 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
}

// creating the form data with rezized images
const createFormData = async (photo) => {
    const data = new FormData();
    //const resizedPhoto = await resizeImage(photo);
    //const uriParts = resizedPhoto.uri.split('.');
    //const fileType = uriParts[uriParts.length - 1];
    console.log("the files is ", photo);
    return data;
};


export const uploadImage = async (file) => {
    const formData = await createFormData(file);
    const config = {
        headers: {
            Aceept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    };
    try {
        //upload using fetchAPI
        const response = await fetch(`${BASE_LIVE_URL}/api/v1/predict`, {
            method: 'POST',
            body: formData,
            ...config
        });
        const data = await response.json();
        // got the predction of
        console.log("got data the predction of inside upload fn :", data);
        return data;
    } catch (err) {
        alert("Error while uploading the image")
        return false
    }
    //fecth is better than axios cause it worked for me
}