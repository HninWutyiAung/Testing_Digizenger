import { HiOutlinePlus } from "react-icons/hi";
import { PiPencilSimpleFill } from "react-icons/pi";
import Creatix from "../../../images/Creatix.png";
import Innovate from "../../../images/Innovate.png";
import Bright from "../../../images/Bright.png";
import Aurelia from "../../../images/Aurelia.png";
import Solara from "../../../images/Solara.png";
import { useState } from "react";

const About = () => {
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
        <div className="w-[426px] h-auto p-4 bg-white rounded-lg border border-solid border-[#C9DCDE] flex-col justify-start items-start gap-2 inline-flex mt-[10px]">
            <div className="w-[400px] h-auto self-stretch flex-col justify-start items-start gap-3 flex">
                <div className="w-full h-[20px] self-stretch justify-between items-center inline-flex">
                    <div className="w-[44px] h-[20px] text-[#2C3E50] text-lg font-bold font-['DM Sans']">About</div>
                    <div className="w-[56px] h-[18px] justify-start items-center gap-2 flex">
                        <HiOutlinePlus className="w-5 h-5 text-[#2C3E50]" />
                        <PiPencilSimpleFill className="w-5 h-5 text-[#2C3E50]" />
                    </div>
                </div>
                {/* Career History */}
                <div className="w-[400px] self-stretch p-2 rounded border border-solid border-[#ECF1F4] flex-col justify-start items-start gap-2 flex">
                    <div className="w-[368px] self-stretch justify-start items-center gap-4 inline-flex">
                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">Career History</div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                        {careerHistory.map((job, index) => (
                            <div key={index} className="w-full">
                                <div className="w-full justify-start items-center gap-2 inline-flex">
                                    <img className="w-9 h-9 rounded-[4px] border border-solid border-[#ECF1F4]" src={job.companyLogo} alt={`${job.companyName} logo`} />
                                    <div className="grow shrink basis-0 w-[328px] flex-col justify-center items-start inline-flex">
                                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">{job.positionTitle}</div>
                                        <div className="w-full self-stretch justify-between items-center inline-flex">
                                            <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans']">{job.companyName}</div>
                                            <div className="text-[#2C3E50] text-xs font-normal font-['DM Sans']">{job.startDate} – {job.endDate}</div>
                                        </div>
                                    </div>
                                </div>
                                {index < careerHistory.length - 1 && (
                                    <div className="w-full border-b border-[#ECF1F4]"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Education */}
                <div className="w-[400px] self-stretch p-2 rounded border border-solid border-[#ECF1F4] flex-col justify-start items-start gap-2 flex">
                    <div className="w-full self-stretch justify-start items-center gap-4 inline-flex">
                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">Education</div>
                    </div>
                    <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
                        {educationHistory.map((education, index) => (
                            <div key={index} className="w-full">
                                <div className="w-full justify-start items-center gap-2 inline-flex">
                                    <div className="w-9 h-9 relative">
                                        <div className="w-9 h-9 left-0 top-0 absolute rounded-[4px] border border-solid border-[#ECF1F4]"></div>
                                        <img className="w-[24px] h-[24px] left-[7px] top-[7px] absolute" src={education.institutionLogo} alt={`${education.institutionName} logo`} />
                                    </div>
                                    <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                                        <div className="h-[18px] text-[#2C3E50] text-sm font-bold font-['DM Sans']">{education.institutionName}</div>
                                        <div className="w-full h-[18px] self-stretch justify-between items-center inline-flex">
                                            <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans']">{education.degree}</div>
                                            <div className="text-[#2C3E50] text-xs font-normal font-['DM Sans']">{education.startDate} – {education.endDate}</div>
                                        </div>
                                    </div>
                                </div>
                                {index < educationHistory.length - 1 && (
                                    <div className="w-full border-b border-[#ECF1F4]"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Services Provided */}
                <div className="w-[400px] h-auto self-stretch p-2 rounded border border-solid border-[#ECF1F4] flex-col justify-start items-start gap-2 flex">
                    <div className="w-full h-[18px] self-stretch justify-start items-center gap-4 inline-flex">
                        <div className="text-[#2C3E50] text-sm font-bold font-['DM Sans']">Services Provided</div>
                    </div>
                    <div className="w-full h-auto flex flex-wrap gap-1.5">
                        {['UX & UI', 'User Interface Design', 'Animation Design', 'Illustrations', 'Motion Graphics', 'Web Design', 'Web Development'].map((service, index) => (
                            <div key={index} className="px-2 py-1 bg-[#ECF1F4] rounded-[40px] flex items-center">
                                <div className="text-[#2C3E50] text-sm font-normal font-['DM Sans'] leading-none whitespace-nowrap">{service}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
