import { HiOutlinePlus } from "react-icons/hi";
import { PiPencilSimpleFill } from "react-icons/pi";
import { useState } from "react";
import EditAboutInfo from "./EditAboutInfo";
import { useGetProfileQuery } from "../../apiService/Profile";

const About = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, error, isLoading } = useGetProfileQuery();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveModal = () => {
        setIsModalOpen(false);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile data.</div>;

    const careerHistory = data?.profileDto?.careerHistoryDtoList || [];
    const educationHistory = data?.profileDto?.educationHistoryDtoList || [];
    const servicesProvided = data?.profileDto?.serviceProvidedDtoList || [];


    // Helper function to render placeholder logo with initial
    const renderPlaceholderLogo = (name) => (
        <div className="w-9 h-9 rounded-[4px] bg-[#00BCD4] flex justify-center items-center text-white font-bold">
            {name ? name[0] : ""}
        </div>
    );

    return (
        <div className="h-auto p-4 bg-white rounded-lg border border-solid border-[#C9DCDE] flex-col justify-start items-start gap-2 inline-flex mt-[10px]">
            <div className="h-auto self-stretch flex-col justify-start items-start gap-3 flex">
                <div className="w-full h-[20px] flex justify-between items-center">
                    <div className="text-[#2C3E50] text-xl font-bold font-['DM Sans']">About</div>
                    <PiPencilSimpleFill className="w-6 h-6 text-[#2C3E50] cursor-pointer" onClick={handleOpenModal}/>
                </div>
                
                {/* Career History */}
                <div className="self-stretch p-2 rounded border border-solid border-[#ECF1F4] flex-col justify-start items-start gap-2 flex">
                    <div className="w-full justify-start items-center gap-4 inline-flex">
                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">Career History</div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                        {careerHistory.map((job, index) => (
                        <div key={index} className="w-full">
                            <div className="w-full flex flex-wrap justify-between items-center gap-2">
                                {/* Company Logo or Placeholder */}
                                {job.companyDto.logoImageUrl ? (
                                    <img
                                        className="w-9 h-9 rounded-[4px] border border-solid border-[#ECF1F4]"
                                        src={job.companyDto.logoImageUrl}
                                        alt={`${job.companyDto.companyName} logo`}
                                    />
                                ) : (
                                    renderPlaceholderLogo(job.companyDto.companyName)
                                )}

                                {/* Job Title and Company Info */}
                                <div className="flex-1 flex-col justify-center items-start">
                                    <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans'] text-left">
                                        {job.designation}
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] text-left">
                                            {job.companyDto.companyName}
                                        </div>
                                        <div className="text-[#2C3E50] text-xs font-normal font-['DM Sans']">
                                            {job.joinDate.slice(0, 4)} – {job.present === "YES" ? "Present" : job.endDate.slice(0, 4)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            {index < careerHistory.length - 1 && (
                            <div className="w-full border-b border-[#ECF1F4] my-2"></div>
                            )}
                        </div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div className="self-stretch p-2 rounded border border-solid border-[#ECF1F4] flex-col justify-start items-start gap-2 flex">
                    <div className="w-full self-stretch justify-start items-center gap-4 flex">
                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">Education</div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                        {educationHistory.map((education, index) => (
                        <div key={index} className="w-full">
                            <div className="w-full flex justify-start items-center gap-2">
                                {/* Institution Logo or Placeholder */}
                                {education.schoolDto.logoImageUrl ? (
                                    <img
                                        className="w-9 h-9 rounded-[4px] border border-solid border-[#ECF1F4]"
                                        src={education.schoolDto.logoImageUrl}
                                        alt={`${education.schoolDto.schoolName} logo`}
                                    />
                                ) : (
                                    renderPlaceholderLogo(education.schoolDto.schoolName)
                                )}

                                {/* Institution Name and Degree Info */}
                                <div className="flex-1 flex-col justify-center">
                                    {/* Institution Name */}
                                    <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans'] text-left">
                                        {education.schoolDto.schoolName}
                                    </div>
                                    {/* Degree and Dates */}
                                    <div className="w-full flex justify-between items-center">
                                        <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] text-left">
                                            {education.degreeName}
                                        </div>
                                        <div className="text-[#2C3E50] text-xs font-normal font-['DM Sans']">
                                            {education.joinDate.slice(0, 4)} – {education.present === "YES" ? "Present" : education.endDate?.slice(0, 4)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            {index < educationHistory.length - 1 && (
                            <div className="w-full border-b border-[#ECF1F4] my-2"></div>
                            )}
                        </div>
                        ))}
                    </div>
                </div>

                {/* Services Provided */}
                <div className="h-auto self-stretch p-2 rounded border border-solid border-[#ECF1F4] flex-col justify-start items-start gap-2 flex">
                    <div className="w-full h-[18px] self-stretch justify-start items-center gap-4 inline-flex">
                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">Services Provided</div>
                    </div>
                    <div className="w-full h-auto flex flex-wrap gap-2">
                        {servicesProvided.map((service, index) => (
                        <div key={index} className="px-2 py-1 bg-[#ECF1F4] rounded-full flex items-center">
                            <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] leading-none whitespace-nowrap">
                                {service.service}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <EditAboutInfo isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveModal} careerHistory={careerHistory} educationHistory={educationHistory} servicesProvided={servicesProvided}/>
        </div>
    );
};

export default About;
