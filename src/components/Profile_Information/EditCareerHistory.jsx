import React, { useState } from 'react';

const EditCareerInfo = ({ isOpenEditCar, onClose, onSave, career }) => {
    if (!isOpenEditCar) return null;

    const [title, setTitle] = useState(career ? career.title : '');
    const [company, setCompany] = useState(career ? career.company : '');
    const [period, setPeriod] = useState(career ? career.period : '');

    const handleSave = () => {
        const newCareer = {
            id: career ? career.id : Date.now(),
            title,
            company,
            period,
            logoUrl: 'https://via.placeholder.com/60x60',
        };
        onSave(newCareer); 
        onClose(); 
    };

    return (
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-[999] flex flex-col justify-center items-center">
            <div className="bg-white rounded-lg border border-solid border-[#c9dcde] p-4">
                <h2 className="text-lg font-bold">Edit Career Info</h2>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="border p-2 w-full mb-2"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-300 px-4 py-2 mr-2" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditCareerInfo;
