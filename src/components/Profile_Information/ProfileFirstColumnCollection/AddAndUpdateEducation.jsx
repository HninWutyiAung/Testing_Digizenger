import React, { useState, useEffect } from "react";
import {
  useAddEducationHistoryMutation,
  useUpdateEducationHistoryMutation,
} from "../../../apiService/Profile";

const AddAndUpdateEducation = ({
  isOpenEdu,
  onClose,
  refetch,
  currentEducation,
}) => {
  if (!isOpenEdu) return null;

  const [schoolName, setSchoolName] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const [addEducationHistory] = useAddEducationHistoryMutation();
  const [updateEducationHistory] = useUpdateEducationHistoryMutation();

  useEffect(() => {
    if (currentEducation) {
      setSchoolName(currentEducation.schoolDto?.schoolName || "");
      setDegreeName(currentEducation.degreeName || "");
      setFieldOfStudy(currentEducation.fieldOfStudy || "");
      setJoinDate(currentEducation.joinDate || "");
      setEndDate(
        currentEducation.present === "YES" ? "" : currentEducation.endDate || ""
      );
    }
  }, [currentEducation]);

  const validateForm = () => {
    let formErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!schoolName) formErrors.schoolName = true;
    if (!degreeName) formErrors.degreeName = true;
    if (!fieldOfStudy) formErrors.fieldOfStudy = true;

    if (!joinDate || joinDate > today) {
      formErrors.joinDate = "Join date must be a valid past date.";
    }

    if (!endDate) {
      formErrors.endDate = "End date is required.";
    } else if (endDate <= joinDate) {
      formErrors.endDate = "End date must be after the join date.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("schoolName", schoolName);
      formData.append("degreeName", degreeName);
      formData.append("fieldOfStudy", fieldOfStudy);
      formData.append("joinDate", formatDate(joinDate));
      formData.append("endDate", formatDate(endDate));
      formData.append("present", "NO");

      try {
        if (currentEducation) {
          await updateEducationHistory({
            id: currentEducation.id,
            formData,
          }).unwrap();
        } else {
          await addEducationHistory(formData).unwrap();
        }
        await refetch();
        onClose();
      } catch (error) {
        console.error("Failed to save education history:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <form
      className="2xl:w-[790px] 2xl:h-[500px] xl:w-[700px] xl:h-[450px] lg:w-[600px] lg:h-[400px] md:w-[500px] md:h-[350px] sm:h-[300px] sm:w-[400px] relative bg-white rounded-lg border border-solid border-[#c9dcde] overflow-hidden flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="w-full p-3 bg-[#ecf1f4] border-b border-solid border-[#ecf1f4] justify-start items-center gap-2.5 inline-flex">
        <div className="text-center text-[#2c3e50] text-lg font-bold">
          {currentEducation ? "Edit Education" : "Add Education"}
        </div>
      </div>
      {/* Form Content */}
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
          {/* School */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              School *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.schoolName ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
              <input
                type="text"
                value={schoolName}
                placeholder="e.g. Yangon University"
                onChange={(e) => {
                  setSchoolName(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, schoolName: false }));
                  }
                }}
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
              />
            </div>
            {errors.schoolName && (
              <p className="text-red-500 text-xs">School name is required.</p>
            )}
          </div>
          {/* Degree */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Degree *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.degreeName ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
              <input
                type="text"
                value={degreeName}
                placeholder="e.g. Bachelor's"
                onChange={(e) => {
                  setDegreeName(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, degreeName: false }));
                  }
                }}
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
              />
            </div>
            {errors.degreeName && (
              <p className="text-red-500 text-xs">Degree is required.</p>
            )}
          </div>
          {/* Field of Study */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Field of study *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.fieldOfStudy ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
              <input
                type="text"
                value={fieldOfStudy}
                placeholder="e.g. Computer Science"
                onChange={(e) => {
                  setFieldOfStudy(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, fieldOfStudy: false }));
                  }
                }}
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
              />
            </div>
            {errors.fieldOfStudy && (
              <p className="text-red-500 text-xs">
                Field of study is required.
              </p>
            )}
          </div>
          {/* Start Date */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Start date *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.joinDate ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
              <input
                type="date"
                value={joinDate}
                placeholder="Select Date"
                onChange={(e) => {
                  setJoinDate(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, joinDate: false }));
                  }
                }}
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
              />
            </div>
            {errors.joinDate && (
              <p className="text-red-500 text-xs">
                Valid start date is required.
              </p>
            )}
          </div>
          {/* End Date */}
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              End date (or expected)
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                errors.endDate ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  if (e.target.value) {
                    setErrors((prev) => ({ ...prev, endDate: false }));
                  }
                }}
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
              />
            </div>
            {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate}</p>
            )}
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
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddAndUpdateEducation;
