import WaveSurfer from "wavesurfer.js";
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


// chatBoxService.js

let audioContext, analyser, stream, mediaRecorder;
const audioChunks = [];

export const startRecordingWithWaveform = (canvasRef, setAudioUrl ,setAudioBase64, audioBase64) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(userStream => {
        stream = userStream;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();

        source.connect(analyser);
        analyser.fftSize = 2048;

        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const base64Audio = reader.result.split(',')[1];
                setAudioBase64(base64Audio);
                setAudioUrl(`data:audio/wav;base64,${base64Audio}`);
            };
            
            reader.readAsDataURL(audioBlob); 
            audioChunks.length = 0; 
        };

        mediaRecorder.start();


        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");

        const draw = () => {
            if (!analyser) return; 
            requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = "#00BCD4";
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = "#ffffff";

            canvasCtx.beginPath();

            const desiredLineLength = 200; // Set the desired length of the line in pixels
            let sliceWidth = (desiredLineLength / bufferLength) || (canvas.width * 1.0 / bufferLength);
            
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                let v = dataArray[i] / 128.0;
                let y = v * canvas.height / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
                if (x >= desiredLineLength) break;
            }

            canvasCtx.lineTo(desiredLineLength, canvas.height / 2); 
            canvasCtx.stroke();
        };

        draw();
    }).catch(error => {
        console.error("Error accessing microphone:", error);
    });
};

export const stopRecordingWithWaveform = () => {
    if (mediaRecorder) {
        mediaRecorder.stop(); // Stop MediaRecorder and trigger audioUrl creation
    }
    if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop all audio tracks
        stream = null;
    }
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    analyser = null; // Nullify the analyser to stop the drawing loop
};

export const waveFormPreview = (audioUrl, waveSurferRef, waveformContainerRef) => {
    if (audioUrl && waveSurferRef.current) {
        waveSurferRef.current.destroy();
    }
    if (audioUrl) {
        waveSurferRef.current = WaveSurfer.create({
            container: waveformContainerRef.current,
            waveColor: "#ffffff",
            height: 40,
            barWidth: 2,
            responsive: true,
            cursorWidth: 0, 
        });
        waveSurferRef.current.load(audioUrl);
    }
    return () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.destroy();
        }
    };
}
