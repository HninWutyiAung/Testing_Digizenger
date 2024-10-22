import React, { useState, useEffect } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

const AddServices = ({ isOpenAddSer, onClose, onSave, existingServices = [] }) => {
    if (!isOpenAddSer) return null;

    const [newService, setNewService] = useState('');
    const [services, setServices] = useState([]);

    // Load existing services when the modal opens
    useEffect(() => {
        setServices(existingServices);
    }, [existingServices]);

    const handleAddService = () => {
        if (newService.trim() !== '' && !services.includes(newService)) {
            setServices([...services, newService]);
            setNewService(''); // Clear input after adding
        }
    };

    const handleRemoveService = (serviceToRemove) => {
        setServices(services.filter(service => service !== serviceToRemove));
    };

    const handleSave = () => {
        onSave(services); // Pass the updated list of services back to the parent
        onClose(); // Close the modal and re-show the EditAboutInfo
    };

    // Add service when "Enter" key is pressed
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission or newline behavior
            handleAddService(); // Call function to add service
        }
    };

    return (
        <div className="fixed inset-0 bg-[#00000080] z-[999] flex flex-col justify-center items-center">
            <div className="w-[500px] h-auto bg-white rounded-lg border border-[#c9dcde] p-5">
                <div className="w-full text-center text-lg font-bold text-[#2c3e50] mb-5">
                    Add Services
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <input
                        type="text"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        onKeyDown={handleKeyDown} // Handle Enter key press
                        className="w-full px-3 py-2 border border-[#c9dcde] rounded-lg"
                        placeholder="Enter a service..."
                    />
                    <button
                        onClick={handleAddService}
                        className="ml-3 bg-[#0097a7] text-white px-4 py-2 rounded-lg"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="inline-flex items-center gap-2 bg-[#ecf1f4] px-4 py-2 rounded-lg w-auto"
                        >
                            <span className="text-[#2c3e50] text-sm">{service}</span>
                            <IoCloseCircle
                                className="text-[#0097a7] cursor-pointer"
                                onClick={() => handleRemoveService(service)}
                            />
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-end mt-5 gap-3">
                    <button
                        onClick={onClose}
                        className="bg-[#ecf1f4] text-[#2c3e50] px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-[#0097a7] text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddServices;
