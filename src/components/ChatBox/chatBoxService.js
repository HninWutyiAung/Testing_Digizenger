export function compressBase64Image(base64Image, quality = 0.6) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Image;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width * 0.5;
            canvas.height = img.height * 0.5;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const compressedBase64 = canvas.toDataURL("image/jpeg", quality); 
            resolve(compressedBase64);
        };
    });
}

export const isURL = (str) => {
    const urlRegex = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    return urlRegex.test(str);
}

export const isBase64 = (str) => {
    const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
    return base64Regex.test(str);
};