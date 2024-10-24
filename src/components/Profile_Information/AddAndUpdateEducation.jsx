import React, { useState, useEffect } from 'react';

const AddAndUpdateEducation = ({isOpenEdu, onClose, onSave, currentEducation }) => {
    if (!isOpenEdu) return null;

    const currentYear = new Date().getFullYear();
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [study, setStudy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentEducation) {
            setSchool(currentEducation.school || '');
            setDegree(currentEducation.degree || '');
            setStudy(currentEducation.study || '');
            setStartDate(currentEducation.startDate || '');
            setEndDate(currentEducation.endDate === 'Present' ? String(currentYear) : currentEducation.endDate || '');
        } 
    }, [currentEducation]);
    

    const validateForm = () => {
        let formErrors = {};
        if (!school) formErrors.school = true;
        if (!degree) formErrors.degree = true;
        if (!study) formErrors.study = true;
        if (!/^\d{4}$/.test(startDate)) {
            formErrors.startDate = true;
        }
        if (endDate !== 'Present' && !/^\d{4}$/.test(endDate)) {
            formErrors.endDate = true;
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const educationData = {
                id: currentEducation?.id || Date.now(), 
                school,
                degree,
                study,
                startDate,
                endDate: endDate === String(currentYear) ? 'Present' : endDate,
                logoUrl: currentEducation ? currentEducation.logoUrl : 'https://via.placeholder.com/60x60',
            };
            onSave(educationData); 
            onClose(); 
        }
    };
        

    return (
        <form
            className="2xl:w-[790px] 2xl:h-[500px] xl:w-[700px] xl:h-[450px] lg:w-[600px] lg:h-[400px] md:w-[500px] md:h-[350px] sm:h-[300px] sm:w-[400px] relative bg-white rounded-lg border border-solid border-[#c9dcde] overflow-hidden flex flex-col"
            onSubmit={handleSubmit}
        >
            <div className="w-full p-3 bg-[#ecf1f4] border-b border-solid border-[#ecf1f4] justify-start items-center gap-2.5 inline-flex">
                <div className="text-center text-[#2c3e50] text-lg font-bold">
                    {currentEducation ? 'Edit Education' : 'Add Education'}
                </div>
            </div>

            <div className="w-full p-3 flex-col justify-start items-start inline-flex overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>
                    {`
                    .w-[790px]::-webkit-scrollbar {
                        display: none;
                    }
                    `}
                </style>
                <div className="self-stretch h-[414.03px] flex-col justify-start items-start gap-3 flex">
                    {/* School */}
                    <div className="w-full flex flex-col justify-start items-start gap-3">
                        <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">School *</label>
                        <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.school ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
                            <input
                                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                                type="text"
                                placeholder="e.g. Yangon University"
                                value={school}
                                onChange={(e) => {
                                    setSchool(e.target.value);
                                    if (e.target.value) {
                                        setErrors((prev) => ({ ...prev, school: false }));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Degree */}
                    <div className="w-full flex flex-col justify-start items-start gap-3">
                        <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Degree *</label>
                        <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.degree ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
                            <input
                                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                                type="text"
                                placeholder="e.g. Bachelor's"
                                value={degree}
                                onChange={(e) => {
                                    setDegree(e.target.value);
                                    if (e.target.value) {
                                        setErrors((prev) => ({ ...prev, degree: false }));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Field of Study */}
                    <div className="w-full flex flex-col justify-start items-start gap-3">
                        <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Field of study *</label>
                        <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.study ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
                            <input
                                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                                type="text"
                                placeholder="e.g. Computer Science"
                                value={study}
                                onChange={(e) => {
                                    setStudy(e.target.value);
                                    if (e.target.value) {
                                        setErrors((prev) => ({ ...prev, study: false }));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Start Date */}
                    <div className="w-full flex flex-col justify-start items-start gap-3">
                        <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Start date *</label>
                        <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.startDate ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
                            <input
                                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                                type="text"
                                placeholder="Select Date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    if (/^\d{4}$/.test(e.target.value)) {
                                        setErrors((prev) => ({ ...prev, startDate: false }));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* End Date */}
                    <div className="w-full flex flex-col justify-start items-start gap-3">
                        <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">End date (or expected)</label>
                        <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.endDate ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
                            <input
                                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                                type="text"
                                placeholder="Select Date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    if (e.target.value === 'Present' || /^\d{4}$/.test(e.target.value)) {
                                        setErrors((prev) => ({ ...prev, endDate: false }));
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="w-full py-2 px-4 bg-white border-t border-[#ecf1f4] flex justify-end items-center gap-4">
                <button
                    type="button"
                    className="w-24 px-6 py-2 bg-[#ecf1f4] rounded-lg flex justify-center items-center cursor-pointer text-[#2c3e50] text-sm font-bold font-['DM Sans'] hover:bg-[#d0e3e6]"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-24 px-6 py-2 bg-[#0097a7] rounded-lg flex justify-center items-center cursor-pointer text-white text-sm font-bold font-['DM Sans'] hover:bg-[#007f82]"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default AddAndUpdateEducation;
