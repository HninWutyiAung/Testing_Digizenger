export let coverImage;
export let coverImageUrl;

console.log(coverImageUrl)

export const setCoverImage = (image) => {
    coverImage = image; 
    console.log(coverImage);
};

export default function getCoverCroppedImg(imageSrc, croppedAreaPixels, rotation = 0) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;

            ctx.translate(croppedAreaPixels.width / 2, croppedAreaPixels.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.translate(-croppedAreaPixels.width / 2, -croppedAreaPixels.height / 2);

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            const base64Image = canvas.toDataURL('image/jpeg');
            resolve(base64Image);
        };

        image.onerror = (error) => {
            reject(error);
        };
    });
}

export function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    const extension = mime.split('/')[1]; 
    
    const completeFilename = `${filename}.${extension}`;

    return new File([u8arr], completeFilename, { type: mime });
}

export const handleCoverUpload = async (uploadCoverImage) =>{

    const formData = new FormData();
    formData.append('file', coverImage);
    console.log(coverImage)

    try{
        const response = await uploadCoverImage(formData).unwrap();
        console.log("Cover Upload uploaded successfully:", response);
        if(response && response.coverImageUrl){
            coverImageUrl = response.coverImageUrl;
        }
    }catch(error)
    {
        console.log("Cover Upload Failed" , error)
    }
}