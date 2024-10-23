import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { PiPencilSimpleFill } from "react-icons/pi";
import { PiList } from "react-icons/pi";
import { IoCloseCircle } from "react-icons/io5";
import EditCareerHistory from './EditCareerHistory';
import AddCareerHistory from './AddCareerHistory';
import AddEducation from './AddEducation';
import EditEducation from './EditEducation';
import AddServices from './AddServices';

const EditAboutInfo = ({ isOpen, onClose, onSave}) => {
    if (!isOpen) return null;

    // Start Profile Category
    const [categories] = useState([
        'Digital Creator',
        'Influencer',
        'Photographer',
        'Videographer',
        'Content Writer',
        'Designer',
        'Developer',
        'Blogger',
        'Artist',
        'Social Media Manager',
        'Podcaster',
        'Content Strategist',
        'SEO Specialist',
        'Web Developer',
        'UI/UX Designer',
        'Graphic Designer',
        'Copywriter',
        'Brand Strategist',
        'Community Manager',
        'Email Marketing Specialist',
    ]);
    
    const [selectedCategory, setSelectedCategory] = useState(categories[0]); 
    const [isOpenCat, setIsOpenCat] = useState(false); 

    const toggleDropdown = () => {
        setIsOpenCat(!isOpenCat);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsOpenCat(false); 
    };
    //End Profile Category     

    //Start Introduction
    const [introduction, setIntroduction] = useState(
        'I am an environmentalist who values growth and harmony in my personal and professional life.'
    );

    const handleInputChange = (e) => {
        setIntroduction(e.target.value);
    };
    //End Introduction   

    //Start Career
    const [careerHistory, setCareerHistory] = useState([
        {
            id: 1,
            title: 'Senior UI/UX Designer',
            company: 'Creatix Studios',
            period: '2021 – Present',
            logoUrl: 'https://via.placeholder.com/60x60',
        },
        {
            id: 2,
            title: 'Former UI/UX Designer',
            company: 'Innovate Design Co.',
            period: '2017 – 2021',
            logoUrl: 'https://via.placeholder.com/60x60',
        },
        {
            id: 3,
            title: 'Former Junior UI/UX Designer',
            company: 'Bright Ideas Agency',
            period: '2014 – 2017',
            logoUrl: 'https://via.placeholder.com/60x60',
        },
    ]);

    const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
    const [isAddCareerModalOpen, setIsAddCareerModalOpen] = useState(false);
    const [currentCareer, setCurrentCareer] = useState(null);
    const [isAboutInfoVisible, setIsAboutInfoVisible] = useState(true); 

    const handleOpenCareerModal = (career = null) => {
        setCurrentCareer(career);
        setIsCareerModalOpen(true); 
        setIsAboutInfoVisible(false);
    };

    const handleCloseCareerModal = () => {
        setIsCareerModalOpen(false);
        setIsAboutInfoVisible(true);  
        setCurrentCareer(null);
    };

    const handleSaveCareer = (newCareer) => {
        if (currentCareer) {
            setCareerHistory((prev) => 
                prev.map((career) => (career.id === currentCareer.id ? newCareer : career))
            );
        } else {
            setCareerHistory((prev) => [...prev, newCareer]);
        }
        handleCloseCareerModal();
    };

    const handleOpenAddCareerModal = () => {
        setIsAddCareerModalOpen(true);
        setIsAboutInfoVisible(false); 
    };

    const handleCloseAddCareerModal = () => {
        setIsAddCareerModalOpen(false);
        setIsAboutInfoVisible(true);
    };

    const handleAddCareer = (newCareer) => {
        setCareerHistory((prev) => [...prev, newCareer]);
        handleCloseAddCareerModal();
    };
    //End Career

    // Start Education History 
    const [educationHistory, setEducationHistory] = useState([
        {
        id: 1,
        degree: 'Bachelor of Computer Science',
        institution: 'Aurelia Institute of Technology',
        period: '2021 – 2022',
        logoUrl: 'https://via.placeholder.com/60x60', 
        },
        {
        id: 2,
        degree: 'Diploma in Art in Digital Communication',
        institution: 'University of Solara',
        period: '2015 – 2019',
        logoUrl: 'https://via.placeholder.com/60x60', 
        },
    ]);
    
    const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
    const [isAddEducationModalOpen, setIsAddEducationModalOpen] = useState(false);
    const [currentEducation, setCurrentEducation] = useState(null);

    const handleOpenEducationModal = (education = null) => {
        setCurrentEducation(education);
        setIsEducationModalOpen(true);
        setIsAboutInfoVisible(false);
    };

    const handleCloseEducationModal = () => {
        setIsEducationModalOpen(false);
        setIsAboutInfoVisible(true);
        setCurrentEducation(null);
    };

    const handleSaveEducation = (updatedEducation) => {
        setEducationHistory(prev =>
            prev.map(edu => (edu.id === currentEducation.id ? updatedEducation : edu))
        );
        handleCloseEducationModal();
    };

    const handleOpenAddEducationModal = () => {
        setIsAddEducationModalOpen(true);
        setIsAboutInfoVisible(false);
    };

    const handleCloseAddEducationModal = () => {
        setIsAddEducationModalOpen(false);
        setIsAboutInfoVisible(true);
    };

    const handleAddEducation = (newEducation) => {
        setEducationHistory((prev) => [...prev, newEducation]);
        handleCloseAddEducationModal();
    };
    // End Education History

    //Start Service Provided
    const [services, setServices] = useState([
        'UX & UI',
        'Web Development',
        'User Interface Design',
        'Animation',
        'Illustrations',
        'Motion Graphics',
        'Web Design Development',
    ]);

    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

    const handleOpenAddServiceModal = () => {
        setIsAddServiceModalOpen(true);
        setIsAboutInfoVisible(false);
    };

    const handleCloseAddServiceModal = () => {
        setIsAddServiceModalOpen(false);
        setIsAboutInfoVisible(true);
    };

    const handleSaveServices = (newServices) => {
        setServices(newServices);
        handleCloseAddServiceModal();
    };

    const handleRemoveService = (service) => {
        setServices(services.filter(item => item !== service));
    };
    //End Service Provided

    return (
        <div className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-[999] flex flex-col justify-center items-center">
            {isAboutInfoVisible && (
            <div className="2xl:w-[790px] 2xl:h-[500px] xl:w-[700px] xl:h-[450px] lg:w-[600px] lg:h-[400px] md:w-[500px] md:h-[350px] sm:h-[300px] sm:w-[400px] relative bg-white rounded-lg border border-solid border-[#c9dcde] overflow-hidden flex flex-col">
                <div className="w-full p-3 bg-[#ecf1f4] border-b border-solid border-[#ecf1f4] justify-start items-center gap-2.5 inline-flex">
                    <div className="text-center text-[#2c3e50] text-lg font-bold font-['DM Sans']">Edit About Info</div>
                </div>
                <div className="w-full p-3 flex-col justify-start items-start gap-4 inline-flex overflow-y-scroll" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                    <style>
                        {`
                        /* Hide scrollbar for Chrome, Safari, and Edge */
                        .w-[790px]::-webkit-scrollbar {
                            display: none;
                        }
                        `}
                    </style>
                    {/* Start Profile Category */}
                    <div className="relative self-stretch bg-white flex-col justify-start items-start gap-3 flex">
                        {/* Profile Category Label */}
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Profile Category</div>
                            <div className="opacity-0 justify-start items-center gap-3 flex">
                                <div className="w-4 h-4 p-[3px] justify-center items-center flex" />
                            </div>
                        </div>
                        {/* Profile Category Input box */}
                        <div className={`self-stretch px-4 py-2.5 bg-white border border-[#c9dcde] justify-start items-center gap-2.5 inline-flex cursor-pointer
                            ${isOpenCat ? 'rounded-t-lg border-b-0' : 'rounded-lg'}`}
                            onClick={toggleDropdown}>
                            <div className="grow shrink basis-0 self-stretch justify-start items-center gap-[5px] flex">
                                <div className="grow shrink basis-0 h-6 justify-between items-center flex">
                                    <div className="justify-start items-center gap-1 flex">
                                        <div className="text-[#2c3e50] text-sm font-bold font-['DM Sans'] leading-normal">
                                            {selectedCategory}
                                        </div>
                                    </div>
                                    {/* Change icon based on dropdown state */}
                                    {isOpenCat ? (
                                        <IoIosArrowUp className="w-6 h-6 relative" />
                                    ) : (
                                        <IoIosArrowDown className="w-6 h-6 relative" />
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Dropdown Menu */}
                        {isOpenCat && (
                            <div
                                className="absolute left-0 right-0 bg-white border border-[#c9dcde] rounded-b-lg shadow-md z-10"
                                style={{
                                    top: '100%',
                                    maxHeight: '490px', 
                                    overflowY: 'auto', 
                                    scrollbarWidth: 'none', 
                                    msOverflowStyle: 'none', 
                                }}>
                                
                                <style jsx>{`
                                    div::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>

                                {categories.map((category, index) => (
                                    <div key={index}>
                                        <div
                                            className="px-4 py-2 text-left text-sm hover:bg-[#f0f0f0] cursor-pointer"
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </div>
                                        {index < categories.length - 1 && (
                                            <div className="border-t border-[#c9dcde] mx-2" /> 
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* End Profile Category */}

                    {/* Start Introduction */}
                    <div className="self-stretch bg-white flex-col justify-start items-start gap-3 flex">
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Introduction</div>
                            <div className="opacity-0 justify-start items-center gap-3 flex">
                                <div className="w-4 h-4 p-[3px] justify-center items-center flex" />
                            </div>
                        </div>
                        <div className="self-stretch px-4 py-2.5 bg-white rounded-lg border border-[#c9dcde] justify-start items-center gap-2.5 inline-flex">
                            <input type="text" value={introduction} onChange={handleInputChange} className="w-[977px] text-[#2c3e50] text-sm font-normal font-['DM Sans'] leading-normal border-none outline-none" placeholder="Enter your introduction..."/>
                        </div>
                    </div>
                    {/* End Introduction */}
                    
                    {/* Start Career History */}
                    <div className="self-stretch bg-white flex-col justify-start items-start gap-3 flex">
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Career History</div>
                            <div className="justify-start items-center gap-3 flex cursor-pointer" onClick={handleOpenAddCareerModal}>
                                <AiOutlinePlus className="w-6 h-6 relative"/>
                            </div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                            {careerHistory.map((career, index) => (
                                <div key={career.id} className={`self-stretch justify-start items-center gap-1 inline-flex ${index === careerHistory.length - 1 ? 'mb-0' : 'mb-2'}`}>
                                    <PiList className="w-5 h-5 relative"/>
                                    <div className="grow shrink basis-0 h-[69px] justify-start items-start gap-2 flex">
                                        <img
                                            className="w-[60px] h-[60px] rounded-[5px] border border-[#ecf1f4]"
                                            src={career.logoUrl}
                                            alt={`${career.company} logo`}
                                        />
                                        <div className="grow shrink basis-0 h-[69px] justify-between items-start flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="text-[#2c3e50] text-sm font-bold font-['DM Sans']">
                                                    {career.title}
                                                </div>
                                                <div className="flex-col justify-start items-start flex">
                                                    <div className="text-[#2c3e50] text-sm font-normal font-['DM Sans']">
                                                        {career.company}
                                                    </div>
                                                    <div className="text-[#2c3e50] text-xs font-normal font-['DM Sans']">
                                                        {career.period}
                                                    </div>
                                                </div>
                                            </div>
                                            <PiPencilSimpleFill className="w-6 h-6 relative cursor-pointer" onClick={() => handleOpenCareerModal(career)}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*End Career History */}
                    
                    {/*Start Education History */}
                    <div className="self-stretch bg-white flex-col justify-start items-start gap-3 flex">
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Education</div>
                            <div className="justify-start items-center gap-3 flex cursor-pointer" onClick={handleOpenAddEducationModal}>
                                <AiOutlinePlus className="w-6 h-6 relative" />
                            </div>
                        </div>
                        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
                            {educationHistory.map((education, index) => (
                                <div key={education.id} className={`self-stretch justify-start items-center gap-1 inline-flex ${index !== educationHistory.length - 1 ? 'mb-2' : ''}`}>
                                    <PiList className="w-5 h-5 relative" />
                                    <div className="grow shrink basis-0 h-[69px] justify-start items-start gap-2 flex">
                                        <img className="w-[60px] h-[60px] rounded-[5px] border border-[#ecf1f4]" src={education.logoUrl} alt={`${education.school} logo`} />
                                        <div className="grow shrink basis-0 h-[69px] justify-between items-start flex">
                                            <div className="flex-col justify-start items-start inline-flex">
                                                <div className="text-[#2c3e50] text-sm font-bold font-['DM Sans'] leading-normal">{education.school}</div>
                                                <div className="flex-col justify-start items-start flex">
                                                    <div className="text-[#2c3e50] text-sm font-normal font-['DM Sans'] leading-normal">{education.degree}</div>
                                                    <div className="text-[#2c3e50] text-xs font-normal font-['DM Sans'] leading-[21px]">{education.period}</div>
                                                </div>
                                            </div>
                                            <PiPencilSimpleFill className="w-6 h-6 relative cursor-pointer" onClick={() => handleOpenEducationModal(education)}/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* End Education History  */}

                    {/* Start Service Provided */}
                    <div className="self-stretch h-auto bg-white flex-col justify-start items-start gap-3 flex">
                        <div className="self-stretch justify-between items-center inline-flex">
                            <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Services Provided</div>
                            <div className="justify-start items-center gap-3 flex cursor-pointer" onClick={handleOpenAddServiceModal}>
                                <AiOutlinePlus className="w-6 h-6 relative" />
                            </div>
                        </div>
                        <div className="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
                            {services.map((service, index) => (
                                <div key={index} className="px-4 py-2 bg-[#ecf1f4] rounded-[46.13px] justify-start items-center gap-1 flex whitespace-nowrap">
                                    <div className="text-[#2c3e50] text-sm font-normal font-['DM Sans'] leading-normal">{service}</div>
                                    <IoCloseCircle className="w-4 h-4 relative cursor-pointer" onClick={() => handleRemoveService(service)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* End Service Provided  */}
                </div>
                {/* Start Cancle and Save Button */}
                <div className="w-full py-2 px-4 bg-white border-t border-[#ecf1f4] flex justify-end items-center gap-4">
                    <div className="w-24 px-6 py-2 bg-[#ecf1f4] rounded-lg flex justify-center items-center cursor-pointer" onClick={onClose}>
                        <div className="text-[#2c3e50] text-sm font-bold font-['DM Sans']">Cancel</div>
                    </div>
                    <div className="w-24 px-6 py-2 bg-[#0097a7] rounded-lg flex justify-center items-center cursor-pointer" onClick={onSave}>
                        <div className="text-white text-sm font-bold font-['DM Sans']">Save</div>
                    </div>
                </div>
                {/* End Cancle and Save Button */}
            </div>
            )}
            {isCareerModalOpen && <EditCareerHistory isOpenEditCar={isCareerModalOpen} onClose={handleCloseCareerModal} career={currentCareer} onSave={handleSaveCareer} />}
            {isAddCareerModalOpen && <AddCareerHistory isOpenAddCar={isAddCareerModalOpen} onClose={handleCloseAddCareerModal} onSave={handleAddCareer} />}
            {isAddEducationModalOpen && <AddEducation isOpenAddEdu={isAddEducationModalOpen} onClose={handleCloseAddEducationModal} onSave={handleAddEducation}/>}
            {isEducationModalOpen && <EditEducation isOpenEditEdu={isEducationModalOpen} onClose={handleCloseEducationModal} onSave={handleSaveEducation} education={currentEducation}/>}
            {isAddServiceModalOpen && <AddServices isOpenAddSer={isAddServiceModalOpen} onClose={handleCloseAddServiceModal} onSave={handleSaveServices} existingServices={services}/>}
        </div>
    );
};

export default EditAboutInfo;
