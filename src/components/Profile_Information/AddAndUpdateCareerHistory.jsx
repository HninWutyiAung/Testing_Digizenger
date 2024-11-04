import React, { useState, useEffect } from "react";
import {
  useAddCareerHistoryMutation,
  useUpdateCareerHistoryMutation,
} from "../../apiService/Profile";

const AddAndUpdateCareerHistory = ({ isOpenCar, onClose,refetch, currentCareer }) => {
  if (!isOpenCar) return null;

  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [addCareerHistory] = useAddCareerHistoryMutation();
  const [updateCareerHistory] = useUpdateCareerHistoryMutation();

  useEffect(() => {
    if (currentCareer) {
      setDesignation(currentCareer.designation || "");
      setCompany(currentCareer.companyDto?.companyName || "");
      setJoinDate(currentCareer.joinDate || "");
      setEndDate(
        currentCareer.present === "YES" ? "" : currentCareer.endDate || ""
      );
      setCurrentlyWorking(currentCareer.present === "YES");
    } else {
      setDesignation("");
      setCompany("");
      setJoinDate("");
      setEndDate("");
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
      setIsSaving(true);
      const formData = new FormData();

      formData.append("designation", designation);
      formData.append("joinDate", joinDate);
      formData.append("endDate", currentlyWorking ? "" : endDate);
      formData.append("present", currentlyWorking ? "YES" : "NO");

      const companyName =
        company || currentCareer?.companyDto?.companyName || "";
      formData.append("companyName", companyName); 

      formData.append(
        "logoImageUrl",
        currentCareer?.companyDto?.logoImageUrl || ""
      );

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      try {
        let response;
        if (currentCareer) {
          const { id } = currentCareer;
          response = await updateCareerHistory({ id, formData }).unwrap();
        } else {
          response = await addCareerHistory(formData).unwrap();
        }

        console.log("Response:", response);
        refetch();
        onClose();
      } catch (error) {
        console.error("Error during add/update:", error);
      } finally {
        setIsSaving(false); 
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
          {currentCareer ? "Edit Career History" : "Add Career History"}
        </div>
      </div>

      <div
        className="w-full p-3 flex-col justify-start items-start inline-flex overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
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
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Designation *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.designation ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
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
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Company *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.company ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
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
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Join Date *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.joinDate ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
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
          <div
            className={`self-stretch flex flex-col justify-start items-start gap-3 ${
              currentlyWorking ? "opacity-50" : ""
            }`}
          >
            <label
              className={`text-base font-bold font-['DM Sans'] ${
                currentlyWorking ? "text-gray-400" : "text-[#2c3e50]"
              }`}
            >
              End Date *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.endDate ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
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
                  setEndDate(""); // Clear end date if currently working
                }
              }}
            />
            <label className="text-[#2c3e50] text-base font-normal font-['DM Sans'] leading-normal">
              I am currently working in this role
            </label>
          </div>
        </div>
      </div>

      <div className="w-full py-2 px-4 bg-white border-t border-[#ecf1f4] flex justify-end items-center gap-4">
        <button
          className="w-24 px-6 py-2 bg-[#ecf1f4] rounded-lg flex justify-center items-center cursor-pointer text-[#2c3e50] text-sm font-bold font-['DM Sans'] hover:bg-[#d0e3e6]"
          onClick={onClose}
          type="button"
        >
          Cancel
        </button>
        <button
          className="w-24 px-6 py-2 bg-[#0097a7] rounded-lg flex justify-center items-center cursor-pointer text-white text-sm font-bold font-['DM Sans'] hover:bg-[#007f82]"
          type="submit"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddAndUpdateCareerHistory;
