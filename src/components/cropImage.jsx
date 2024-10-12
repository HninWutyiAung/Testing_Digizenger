export default function getCroppedImg(imageSrc, croppedAreaPixels, rotation = 0) {
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

            // Draw the image cropped
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
