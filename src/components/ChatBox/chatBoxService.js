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
            cursorColor: "transparent",
        });
        waveSurferRef.current.load(audioUrl);
    }
    return () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.destroy();
        }
    };
}

export async function compressAudioBase64(audioBase64, quality = 0.3) {
    return new Promise(async (resolve, reject) => {
        try {
            // Decode the Base64 audio data to binary format
            const audioData = atob(audioBase64);
            console.log("what", audioBase64);
            const arrayBuffer = new ArrayBuffer(audioData.length);
            const uintArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < audioData.length; i++) {
                uintArray[i] = audioData.charCodeAt(i);
            }

            // Create an AudioContext and decode the audio data
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            // Create an OfflineAudioContext for downsampling/compression
            const sampleRate = audioContext.sampleRate * quality;
            const offlineContext = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                audioBuffer.length * quality,
                sampleRate
            );

            // Create a buffer source and connect it to the offline context
            const source = offlineContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(offlineContext.destination);
            source.start(0);

            // Render the audio data with the offline context
            const compressedBuffer = await offlineContext.startRendering();

            // Convert the audio buffer to WAV format
            const wavBlob = bufferToWav(compressedBuffer);
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const compressedBase64 = reader.result.split(',')[1]; // Remove the data URL prefix
                resolve(compressedBase64);
            };

            reader.readAsDataURL(wavBlob); // Convert the WAV blob to base64
        } catch (error) {
            reject(`Error compressing audio: ${error}`);
        }
    });
}

// Utility function to convert an AudioBuffer to WAV format
function bufferToWav(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM format
    const bitDepth = 16; // 16-bit depth

    const bufferLength = audioBuffer.length * numberOfChannels * (bitDepth / 8);
    const wavBuffer = new ArrayBuffer(44 + bufferLength);
    const view = new DataView(wavBuffer);

    let offset = 0;

    // RIFF chunk descriptor
    writeString(view, offset, 'RIFF');
    offset += 4;
    view.setUint32(offset, 36 + bufferLength, true); // File size
    offset += 4;
    writeString(view, offset, 'WAVE');
    offset += 4;

    // FMT sub-chunk
    writeString(view, offset, 'fmt ');
    offset += 4;
    view.setUint32(offset, 16, true); // Sub-chunk size
    offset += 4;
    view.setUint16(offset, format, true); // Audio format (PCM)
    offset += 2;
    view.setUint16(offset, numberOfChannels, true); // Number of channels
    offset += 2;
    view.setUint32(offset, sampleRate, true); // Sample rate
    offset += 4;
    view.setUint32(offset, sampleRate * numberOfChannels * (bitDepth / 8), true); // Byte rate
    offset += 4;
    view.setUint16(offset, numberOfChannels * (bitDepth / 8), true); // Block align
    offset += 2;
    view.setUint16(offset, bitDepth, true); // Bits per sample
    offset += 2;

    // Data sub-chunk
    writeString(view, offset, 'data');
    offset += 4;
    view.setUint32(offset, bufferLength, true); // Data size
    offset += 4;

    // Write audio samples
    const channelData = [];
    for (let i = 0; i < numberOfChannels; i++) {
        channelData[i] = audioBuffer.getChannelData(i);
    }

    let sampleIndex = 0;
    while (sampleIndex < audioBuffer.length) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = Math.max(-1, Math.min(1, channelData[channel][sampleIndex]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }
        sampleIndex++;
    }

    return new Blob([view], { type: 'audio/wav' });
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}
