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
import getCroppedImg from './cropImage'; 

Modal.setAppElement('#root'); 

function ProfileEditBox() {
    const profileBox = useAppSelector(selectProfileBox);
    const dispatch = useAppDispatch();
    const [imageSrc, setImageSrc] = useState(); // Image source
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(john);
    const [showCropper, setShowCropper] = useState(false);
    const [previewActive, setPreviewActive] = useState(false);
    const [lastCroppedImage, setLastCroppedImage] = useState(john);

    const closeProfilebox = () => {
        dispatch(setProfileBox(!profileBox));
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const previewHandleCancel = () =>{
        setPreviewActive(false);
        setShowCropper(false);
        setImageSrc(croppedImage); 
    }
    const onCropSave = async () => {
        if (croppedAreaPixels) {
            try {
                const croppedImageDataUrl = await getCroppedImg(imageSrc, croppedAreaPixels, rotation); // Get the cropped image
                setCroppedImage(croppedImageDataUrl); 
                setShowCropper(false); 
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
                    setCroppedImage(null); 
                };
                reader.readAsDataURL(file);
                setPreviewActive(true);
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
                            src={croppedImage || imageSrc} 
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
                        <div className={`flex flex-col items-center gap-[4px] border-r-[1px] border-[#ECF1F4] ${previewActive ? "px-[10px]":"px-[50px]"}  py-[13px]`} onClick={handleUploadNewPhoto}>
                            <i className='text-[#2C3E50]'><FaCamera size={20} /></i>
                            <div className='text-[14px] text-[#2C3E50]'>Upload New Photo</div>
                        </div>
                       
                            {previewActive ?  ( 
                                <div className="flex text-center justify-between gap-[10px] ml-[15px]">
                                    <button onClick={previewHandleCancel} className="p-2 bg-[#ECF1F4] rounded-md w-[120px]">Cancel</button>
                                    <button onClick={onCropSave} className="p-2 bg-[#0097A7] text-white rounded-md w-[120px]">Save</button>
                                </div>) :
                                (<div className='flex flex-col items-center gap-[4px] border-[#ECF1F4] px-[50px] py-[13px]'>
                                    <i className='text-[#2C3E50]'><RiDeleteBin6Fill size={20} /></i>
                                    <div className='text-[14px] text-[#2C3E50]'>Delete</div>
                                </div>
                                )
                            }

                    </div>
                </div>
            </div>

            {showCropper && (
                <Modal isOpen={showCropper} onRequestClose={() => setShowCropper(false)} contentLabel="Crop Image" className="modal-content" overlayClassName="modal-overlay"
                style={{
                    content: {
                        width: '38rem', 
                        height: '425px', 
                        margin: 'auto', 
                        padding: '0', 
                        borderRadius: '10px',
                        border: 'none', 
                    }
                }}
                >
                    <div className="flex justify-between items-center bg-[#ECF1F4] p-2 rounded-t-[10px]">
                        <h2 className="text-[#2C3E50] font-bold text-[20px]">Edit Photo</h2>
                        <button onClick={() => setShowCropper(false)} className="text-[#2C3E50] text-[20px]">
                            <IoCloseOutline />
                        </button>
                    </div>
                    <div className="crop-container" style={{ position: 'relative', width: '100%', height: '250px' , borderRadius:"100%"}}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            cropShape="round" 
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <div className='flex justify-between ml-[10px] mr-[10px]'>
                        <div className='flex flex-col gap-[5px]'>
                            <div className='mt-2 flex flex-col gap-[10px]'>
                                <label className='text-[14px] font-normal leading-5 text-[#2C3E50]'>Straighten</label>
                                <input type="range" min="0" max="360" step="1" value={rotation} onChange={onRotationChange} className='w-[250px] h-[1px] bg-[#8C8CA1]'/>
                            </div>

                            <div className='mt-2 flex flex-col gap-[10px]'>
                                <label className='text-[14px] font-normal leading-5 text-[#2C3E50]'>Zoom</label>
                                <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(e.target.value)} className='w-[250px] h-[1px] bg-[#8C8CA1]'/>
                            </div>
                        </div>

                        <div className="modal-actions mt-4 flex self-end justify-between gap-[10px]">
                            <button onClick={() => setShowCropper(false)} className="p-2 bg-[#ECF1F4] rounded-md w-[120px]">Cancel</button>
                            <button onClick={onCropSave} className="p-2 bg-[#0097A7] text-white rounded-md w-[120px]">Save</button>
                        </div>

                    </div>
                </Modal>
            )}
        </div>
    );
}

export default ProfileEditBox;
