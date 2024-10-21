import React from "react";

const EditAboutInfo = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-start items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[790px] p-4 relative ml-[80px]">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    X
                </button>

                {/* Modal Content */}
                <div className="text-[#2C3E50] text-lg font-bold mb-4">Edit About Information</div>

                {/* Form to edit about information */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input type="text" className="border border-gray-300 p-2 w-full rounded" placeholder="Your name" />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Job Title</label>
                        <input type="text" className="border border-gray-300 p-2 w-full rounded" placeholder="Your job title" />
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={onSave}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditAboutInfo;
