export function compressBase64Image(base64Image, quality = 0.6) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Image;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // အရိုးအစစ် image dimensions ထက် 0.5x အရွယ်အစားသိပ်ချုပ်ထားခြင်း
            canvas.width = img.width * 0.5;
            canvas.height = img.height * 0.5;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const compressedBase64 = canvas.toDataURL("image/jpeg", quality); // Quality set
            resolve(compressedBase64);
        };
    });
}