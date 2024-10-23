import React, { useState, useEffect } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

const AddServices = ({ isOpenAddSer, onClose, onSave, existingServices = [] }) => {
    if (!isOpenAddSer) return null;

    const [newService, setNewService] = useState('');
    const [services, setServices] = useState([]);

    // Initialize services from existingServices on component mount and whenever it changes
    useEffect(() => {
        setServices(existingServices);
    }, [existingServices]);

    // Function to add a new service
    const handleAddService = () => {
        // Check if the new service is not empty and not already in the list
        if (newService.trim() !== '' && !services.includes(newService.trim())) {
            setServices([...services, newService.trim()]); 
            setNewService(''); 
        }
    };

    // Function to remove a service
    const handleRemoveService = (serviceToRemove) => {
        setServices(services.filter(service => service !== serviceToRemove));
    };

    // Function to save the services and close the modal
    const handleSave = () => {
        onSave(services); 
        onClose(); 
    };

    // Handle keyboard input for adding services
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleAddService(); 
        }
    };

    return (
        <form className="w-full max-w-[400px] h-full max-h-[300px] 2xl:max-w-[790px] 2xl:max-h-[500px] xl:max-w-[700px] xl:max-h-[450px] lg:max-w-[600px] lg:max-h-[400px] md:max-w-[500px] md:max-h-[350px] sm:max-h-[300px] sm:max-w-[400px] relative bg-white rounded-lg border border-solid border-[#c9dcde] overflow-hidden flex flex-col">
            <div className="w-full p-3 bg-[#ecf1f4] border-b border-solid border-[#ecf1f4] justify-start items-center gap-2.5 inline-flex">
                <div className="text-center text-[#2c3e50] text-lg font-bold font-['DM Sans']">Add Services</div>
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
                    {/* Input Section */}
                    <div className="w-full flex justify-between items-center gap-3">
                        <div className={`w-full px-4 py-2.5 bg-white rounded-lg border flex justify-start items-center gap-2.5`}>
                            <input 
                                type="text" 
                                value={newService}
                                onChange={(e) => setNewService(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full h-full bg-transparent text-[#2c3e50] text-sm font-normal font-['DM Sans'] outline-none placeholder-opacity-40" 
                                placeholder="Enter a service..."
                            />
                        </div>
                        
                        <button 
                            type="button" 
                            onClick={handleAddService} 
                            className="w-24 px-4 py-2 bg-[#0097a7] rounded-lg text-white text-sm font-bold font-['DM Sans']"
                        >
                            Add
                        </button>
                    </div>

                    {/* Service List */}
                    <div className="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
                        {services.map((service, index) => (
                            <div key={index} className="px-4 py-2 bg-[#ecf1f4] rounded-[46.13px] justify-start items-center gap-1 flex whitespace-nowrap">
                                <div className="text-[#2c3e50] text-sm font-normal font-['DM Sans'] leading-normal">{service}</div>
                                <IoCloseCircle className="w-4 h-4 relative cursor-pointer" onClick={() => handleRemoveService(service)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
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
                    Save
                </button>
            </div>
        </form>
    );
};

export default AddServices;
