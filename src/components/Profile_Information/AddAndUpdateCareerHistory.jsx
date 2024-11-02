import React, { useState, useEffect } from 'react';
import { useAddCareerHistoryMutation, useUpdateCareerHistoryMutation } from '../../apiService/Profile';

const AddAndUpdateCareerHistory = ({ isOpenCar, onClose, currentCareer }) => {
  console.log('current career: ', currentCareer);
  if (!isOpenCar) return null;

  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(true);
  const [errors, setErrors] = useState({});

  const [addCareerHistory] = useAddCareerHistoryMutation();
  const [updateCareerHistory] = useUpdateCareerHistoryMutation();

  useEffect(() => {
    console.log('Incoming currentCareer:', currentCareer);
    if (currentCareer) {
        setDesignation(currentCareer.designation || '');
        setCompany(currentCareer.companyDto?.companyName || ''); // Ensuring companyName is set correctly
        setJoinDate(currentCareer.joinDate || '');
        setEndDate(currentCareer.present === 'YES' ? '' : currentCareer.endDate || '');
        setCurrentlyWorking(currentCareer.present === 'YES');
    } else {
        setDesignation('');
        setCompany('');
        setJoinDate('');
        setEndDate('');
        setCurrentlyWorking(true);
    }
  }, [currentCareer]);

  const validateForm = () => {
    const formErrors = {};
    if (!designation) formErrors.designation = true;
    if (!company) formErrors.company = true;
    if (!joinDate) formErrors.joinDate = true;
    if (!currentlyWorking && !endDate) formErrors.endDate = true;
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        const careerData = {
            designation,
            joinDate,
            endDate: currentlyWorking ? null : endDate,
            present: currentlyWorking ? 'YES' : 'NO',
            companyDto: {
                id: currentCareer ? currentCareer.companyDto?.id : null,
                companyName: company || '', // Ensuring the input value is used for companyName
                logoImageUrl: currentCareer?.companyDto?.logoImageUrl || null // Placeholder or adjust as needed
            }
        };

        console.log('Career Data being sent:', careerData); // Debugging log for request data

        try {
            let response;
            if (currentCareer) {
                response = await updateCareerHistory({ id: currentCareer.id, ...careerData }).unwrap();
                console.log('Update Response:', response); // Log API response
            } else {
                response = await addCareerHistory(careerData).unwrap();
                console.log('Add Response:', response); // Log API response
            }

            onClose(); // Close modal on success
        } catch (error) {
            console.error('Error during add/update:', error); // Log detailed error
        }
    }
  };

  return (
    <form
      className="w-full max-w-[400px] h-full max-h-[300px] 2xl:max-w-[790px] 2xl:max-h-[500px] xl:max-w-[700px] xl:max-h-[450px] lg:max-w-[600px] lg:max-h-[400px] md:max-w-[500px] md:max-h-[350px] sm:max-h-[300px] sm:max-w-[400px] relative bg-white rounded-lg border border-solid border-[#c9dcde] overflow-hidden flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="w-full p-3 bg-[#ecf1f4] border-b border-solid border-[#ecf1f4] justify-start items-center gap-2.5 inline-flex">
        <div className="text-center text-[#2c3e50] text-lg font-bold">
          {currentCareer ? 'Edit Career History' : 'Add Career History'}
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
          {/* Designation */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Designation *</label>
            <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.designation ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
              <input
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                type="text"
                placeholder="e.g. Marketing Manager"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, designation: false }));
                  }
                }}
              />
            </div>
          </div>

          {/* Company */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Company *</label>
            <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.company ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
              <input
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                type="text"
                placeholder="Select Company"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, company: false }));
                  }
                }}
              />
            </div>
          </div>

          {/* Join Date */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Join Date *</label>
            <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.joinDate ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
              <input
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                type="date"
                value={joinDate}
                onChange={(e) => {
                  setJoinDate(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, joinDate: false }));
                  }
                }}
              />
            </div>
          </div>

          {/* End Date */}
          <div className={`self-stretch flex flex-col justify-start items-start gap-3 ${currentlyWorking ? 'opacity-50' : ''}`}>
            <label className={`text-base font-bold font-['DM Sans'] ${currentlyWorking ? 'text-gray-400' : 'text-[#2c3e50]'}`}>
              End Date *
            </label>
            <div className={`w-full px-4 py-2.5 bg-white rounded-lg border ${errors.endDate ? 'border-red-500' : 'border-[#c9dcde]'} flex justify-start items-center gap-2.5`}>
              <input
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, endDate: false }));
                  }
                }}
                disabled={currentlyWorking}
              />
            </div>
          </div>

          {/* Checkbox: Currently Working */}
          <div className="h-auto justify-start items-center gap-2 inline-flex">
            <input
              type="checkbox"
              className="w-5 h-5 relative"
              checked={currentlyWorking}
              onChange={() => {
                setCurrentlyWorking(!currentlyWorking);
                if (!currentlyWorking) {
                  setEndDate(''); // Clear end date if currently working
                }
              }}
            />
            <label className="text-[#2c3e50] text-sm font-bold font-['DM Sans']">I am currently working in this role</label>
          </div>
        </div>
      </div>

      <div className="w-full px-3 py-4 bg-[#ecf1f4] border-t border-solid border-[#c9dcde] justify-end items-center gap-3 inline-flex">
        <button
          className="px-3 py-1.5 bg-[#0a85c7] rounded-md justify-center items-center gap-2 flex"
          onClick={onClose}
          type="button"
        >
          <div className="text-white text-sm font-bold font-['DM Sans']">Cancel</div>
        </button>
        <button
          className="px-3 py-1.5 bg-[#0a85c7] rounded-md justify-center items-center gap-2 flex"
          type="submit"
        >
          <div className="text-white text-sm font-bold font-['DM Sans']">Save</div>
        </button>
      </div>
    </form>
  );
};

export default AddAndUpdateCareerHistory;
