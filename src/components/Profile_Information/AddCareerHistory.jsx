import React, { useState } from 'react';

const AddCareerHistory = ({ isOpenAddCar, onClose, onSave }) => {
    if (!isOpenAddCar) return null;

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [period, setPeriod] = useState('');

    const handleSave = () => {
        const newCareer = {
            id: Date.now(), 
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
                <h2 className="text-lg font-bold">Add Career History</h2>
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

export default AddCareerHistory;
