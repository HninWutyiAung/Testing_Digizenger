import React, { useState } from "react";
import { useAddServiceProvidedMutation } from "../../../apiService/Profile";

const AddServices = ({ isOpenAddSer, onClose, refetch }) => {
  if (!isOpenAddSer) return null;

  const [newService, setNewService] = useState("");
  const [error, setError] = useState("");
  const [addServiceProvided, { isLoading }] = useAddServiceProvidedMutation();

  const handleSave = async () => {
    if (newService.trim() === "") {
      setError("Service is required");
      return;
    } else {
      setError("");
    }

    try {
      const formData = new FormData();
      formData.append("service", newService.trim());

      await addServiceProvided(formData).unwrap();
      refetch();
      onClose();
    } catch (err) {
      console.error("Failed to add service:", err);
    }
  };

  const handleInputChange = (e) => {
    setNewService(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form className="w-full max-w-[400px] h-full max-h-[300px] 2xl:max-w-[790px] 2xl:max-h-[500px] xl:max-w-[700px] xl:max-h-[450px] lg:max-w-[600px] lg:max-h-[400px] md:max-w-[500px] md:max-h-[350px] sm:max-h-[300px] sm:max-w-[400px] relative bg-white rounded-lg border border-solid border-[#c9dcde] overflow-hidden flex flex-col">
      <div className="w-full p-3 bg-[#ecf1f4] border-b border-solid border-[#ecf1f4] justify-start items-center gap-2.5 inline-flex">
        <div className="text-center text-[#2c3e50] text-lg font-bold font-['DM Sans']">
          Add Services
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
          <div className="w-full flex flex-col justify-start items-start gap-3">
            <label className="text-[#2c3e50] text-base font-bold font-['DM Sans']">
              Service Name *
            </label>
            <div
              className={`w-full px-4 py-2.5 bg-white rounded-lg border ${
                error ? "border-red-500" : "border-[#c9dcde]"
              } flex justify-start items-center gap-2.5`}
            >
              <input
                type="text"
                value={newService}
                onChange={handleInputChange}
                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40"
                placeholder="Enter a service..."
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
        </div>
      </div>

      <div className="w-full py-2 px-4 bg-white border-t border-[#ecf1f4] flex justify-end items-center gap-4">
        <button
          type="button"
          onClick={onClose}
          className="w-24 px-6 py-2 bg-[#ecf1f4] rounded-lg flex justify-center items-center cursor-pointer text-[#2c3e50] text-sm font-bold font-['DM Sans'] hover:bg-[#d0e3e6]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="w-24 px-6 py-2 bg-[#0097a7] rounded-lg flex justify-center items-center cursor-pointer text-white text-sm font-bold font-['DM Sans'] hover:bg-[#007f82]"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddServices;
