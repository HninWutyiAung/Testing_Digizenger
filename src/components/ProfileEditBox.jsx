import john from '/images/emma.jpg';
import { CiCircleInfo } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { FaCamera } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { selectProfileBox, setProfileBox } from "../feature/profileSlice";
import { useAppDispatch, useAppSelector } from '../hook/Hook';
import { IoCloseOutline } from "react-icons/io5";
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Modal from 'react-modal';
import getCroppedImg from './cropImage'; // Ensure this utility is available for cropping logic

Modal.setAppElement('#root'); // Accessibility for modal

function ProfileEditBox() {
    const profileBox = useAppSelector(selectProfileBox);
    const dispatch = useAppDispatch();
    const [imageSrc, setImageSrc] = useState(john); // Image source
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const closeProfilebox = () => {
        dispatch(setProfileBox(!profileBox));
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onCropSave = async () => {
        if (croppedAreaPixels) {
            try {
                const croppedImageDataUrl = await getCroppedImg(imageSrc, croppedAreaPixels, rotation); // Get the cropped image
                setCroppedImage(croppedImageDataUrl); // Set the cropped image state
                setShowCropper(false); // Close the cropper modal
            } catch (error) {
                console.error("Error cropping image:", error);
            }
        } else {
            console.log("No cropping area defined.");
        }
    };

    const openCropper = () => {
        setShowCropper(true);
    };

    const handleUploadNewPhoto = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImageSrc(reader.result);
                    // Optionally, show the cropper after uploading
                    setCroppedImage(null); // Reset cropped image
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    };

    const onRotationChange = (e) => {
        setRotation(Number(e.target.value));
    };

    return (
        <div className="profile-edit-box-overlay">
            <div className="profile-edit-box">
                <div className="flex flex-col justify-center items-center gap-[20px]">
                    <div className="flex items-center p-[14px] self-stretch justify-between bg-[#ECF1F4] rounded-t-[10px]">
                        <div className="text-[#2C3E50] font-bold text-[20px]">Profile Photo</div>
                        <i className="text-[#2C3E50] text-[20px]" onClick={closeProfilebox}>
                            <IoCloseOutline />
                        </i>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-[10px] w-[350px]'>
                        <img 
                            src={croppedImage || imageSrc} // Show cropped image or original based on state
                            className='w-[150px] h-[150px] border-[2px] border-[#D9D9D9] rounded-full' 
                            alt="Profile Preview"
                        />
                        <span className='text-[14px] text-[#2C3E50] font-bold'>Preview</span>
                        <div className='flex justify-center text-[12px] gap-[4px] text-[#7E7E8D] font-normal leading-5'>
                            <i className='text-[18px] ml-[10px]'><CiCircleInfo /></i>
                            <span className='text-left'>Recommended: Upload a clear profile picture to help others recognize you easily on the platform.</span>
                        </div>
                    </div>

                    <div className='flex items-center self-stretch justify-center border-t-[1px] border-[#ECF1F4] py-[14px] px-[28px]'>
                        <div className='flex flex-col items-center gap-[4px] border-r-[1px] border-[#ECF1F4] px-[50px] py-[13px]' onClick={openCropper}>
                            <i className='text-[#2C3E50]'><MdEdit size={20} /></i>
                            <div className='text-[14px] text-[#2C3E50]'>Edit</div>
                        </div>
                        <div className='flex flex-col items-center gap-[4px] border-r-[1px] border-[#ECF1F4] px-[50px] py-[13px]' onClick={handleUploadNewPhoto}>
                            <i className='text-[#2C3E50]'><FaCamera size={20} /></i>
                            <div className='text-[14px] text-[#2C3E50]'>Upload New Photo</div>
                        </div>
                        <div className='flex flex-col items-center gap-[4px] border-[#ECF1F4] px-[50px] py-[13px]'>
                            <i className='text-[#2C3E50]'><RiDeleteBin6Fill size={20} /></i>
                            <div className='text-[14px] text-[#2C3E50]'>Delete</div>
                        </div>
                    </div>
                </div>
            </div>

            {showCropper && (
                <Modal isOpen={showCropper} onRequestClose={() => setShowCropper(false)} contentLabel="Crop Image" className="modal-content" overlayClassName="modal-overlay"
                style={{
                    content: {
                        width: '38rem', // Set the modal width to match the profile photo width
                        height: '425px', // Set the desired height
                        margin: 'auto', // Center the modal in the viewport
                        padding: '0', // Remove padding to allow full usage of space
                        borderRadius: '10px', // Rounded corners
                        border: 'none', // No border
                        background: '#ECF1F4' // Background color for the modal
                    }
                }}
                >
                    <div className="flex justify-between items-center bg-[#ECF1F4] p-2 rounded-t-[10px]">
                        <h2 className="text-[#2C3E50] font-bold text-[20px]">Edit Photo</h2>
                        <button onClick={() => setShowCropper(false)} className="text-[#2C3E50] text-[20px]">
                            <IoCloseOutline />
                        </button>
                    </div>
                    <div className="crop-container" style={{ position: 'relative', width: '100%', height: '250px'}}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation} // Pass rotation to the Cropper
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <div className='mt-2 flex flex-col'>
                        <label>Rotate</label>
                        <input type="range" min="0" max="360" step="1" value={rotation} onChange={onRotationChange} className='w-[300px]'/>
                    </div>

                    <div className='mt-2 flex flex-col'>
                        <label>Zoom</label>
                        <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(e.target.value)} className='w-[300px]'/>
                    </div>

                    <div className="modal-actions mt-4 flex justify-between">
                        <button onClick={() => setShowCropper(false)}>Cancel</button>
                        <button onClick={onCropSave}>Save</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ProfileEditBox;
