// EditEducation.jsx
import React, { useState, useEffect } from 'react';

const EditEducation = ({ isOpenEditEdu, onClose, onSave, education }) => {
    const [degree, setDegree] = useState('');
    const [institution, setInstitution] = useState('');
    const [period, setPeriod] = useState('');
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        if (education) {
            setDegree(education.degree);
            setInstitution(education.institution);
            setPeriod(education.period);
            setLogoUrl(education.logoUrl);
        }
    }, [education]);

    const handleSave = () => {
        const updatedEducation = {
            ...education,
            degree,
            institution,
            period,
            logoUrl,
        };

        onSave(updatedEducation);
    };

    if (!isOpenEditEdu) return null;

    return (
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-[999] flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-lg font-bold mb-4">Edit Education</h2>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Degree</label>
                    <input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter degree"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Institution</label>
                    <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter institution"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Period</label>
                    <input
                        type="text"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter period (e.g. 2018-2022)"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Logo URL</label>
                    <input
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        placeholder="Enter logo URL"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditEducation;