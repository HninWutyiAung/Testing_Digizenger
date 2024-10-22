import { HiOutlinePlus } from "react-icons/hi";
import { PiPencilSimpleFill } from "react-icons/pi";
import Creatix from "../../../images/Creatix.png";
import Innovate from "../../../images/Innovate.png";
import Bright from "../../../images/Bright.png";
import Aurelia from "../../../images/Aurelia.png";
import Solara from "../../../images/Solara.png";
import { useState } from "react";
import EditAboutInfo from "./EditAboutInfo";

const About = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveModal = () => {
        // Add logic to handle save changes in modal
        setIsModalOpen(false);
    };

    const [careerHistory] = useState([
        {
            companyName: "Creatix Studios",
            positionTitle: "Senior UI/UX Designer",
            startDate: "2021",
            endDate: "Present",
            companyLogo: Creatix 
        },
        {
            companyName: "Innovate Design Co.",
            positionTitle: "Former UI/UX Designer",
            startDate: "2017",
            endDate: "2021",
            companyLogo: Innovate 
        },
        {
            companyName: "Bright Ideas Agency",
            positionTitle: "Former Junior UI/UX Designer",
            startDate: "2014",
            endDate: "2017",
            companyLogo: Bright 
        }
    ]);

    const [educationHistory] = useState([
        {
            institutionName: "Aurelia Institute of Technology",
            degree: "Bachelor of Computer Science",
            startDate: "2021",
            endDate: "2022",
            institutionLogo: Aurelia 
        },
        {
            institutionName: "University of Solara",
            degree: "Diploma in Art in Digital Communication",
            startDate: "2015",
            endDate: "2019",
            institutionLogo: Solara 
        }
    ]);

    return(
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
                            {/* Company Logo */}
                            <img
                                className="w-9 h-9 rounded-[4px] border border-solid border-[#ECF1F4]"
                                src={job.companyLogo}
                                alt={`${job.companyName} logo`}
                            />

                            {/* Job Title and Company Info */}
                            <div className="flex-1 flex-col justify-center items-start">
                                <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans'] text-left">{job.positionTitle}</div>
                                <div className="w-full flex justify-between items-center">
                                <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] text-left">{job.companyName}</div>
                                <div className="text-[#2C3E50] text-xs font-normal font-['DM Sans']">{job.startDate} – {job.endDate}</div>
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
                            {/* Institution Logo */}
                            <div className="w-9 h-9 relative">
                                <div className="w-9 h-9 rounded-[4px] border border-solid border-[#ECF1F4]"></div>
                                <img
                                className="w-[24px] h-[24px] left-[7px] top-[7px] absolute"
                                src={education.institutionLogo}
                                alt={`${education.institutionName} logo`}
                                />
                            </div>
                            {/* Institution Name and Degree Info */}
                            <div className="flex-1 flex-col justify-center">
                                {/* Institution Name (first line) */}
                                <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans'] text-left">{education.institutionName}</div>  
                                {/* Degree (left) and Date (right) on second line */}
                                <div className="w-full flex justify-between items-center">
                                <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] text-left">{education.degree}</div>
                                <div className="text-[#2C3E50] text-xs font-normal font-['DM Sans']">{education.startDate} – {education.endDate}</div>
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

                    {/* Container for Services */}
                    <div className="w-full h-auto flex flex-wrap gap-2">
                        {['UX & UI', 'User Interface Design', 'Animation Design', 'Illustrations', 'Motion Graphics', 'Web Design', 'Web Development'].map((service, index) => (
                        <div key={index} className="px-2 py-1 bg-[#ECF1F4] rounded-full flex items-center">
                            <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] leading-none whitespace-nowrap">{service}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <EditAboutInfo isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveModal} />
        </div>
    );
};

export default About;
