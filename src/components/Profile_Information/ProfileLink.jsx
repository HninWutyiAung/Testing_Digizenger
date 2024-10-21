import { PiPencilSimpleFill } from "react-icons/pi";

const ProfileLink = () => {
    return(
        <div className="fixed top-[3.1rem] z-20">
            <div className="w-[348px] max-w-[349px] h-auto max-h-[68px] px-3 py-4 bg-white border-b border-[#ecf1f4] justify-start items-center gap-2 inline-flex
                            sm:px-2 sm:py-3
                            md:px-2 md:py-3
                            lg:px-2 lg:py-3
                            xl:px-3 xl:py-4">
                <div className="rounded-lg flex-col justify-center items-start gap-1 inline-flex">
                    <div className="justify-start items-center gap-2 inline-flex">
                        <div className="text-[#2c3e50] font-bold font-['DM Sans']
                                        text-xs
                                        sm:text-sm
                                        md:text-sm
                                        lg:text-base
                                        xl:text-base">Profile Link</div>
                        <div className="p-1.5 bg-[#ecf1f4] rounded-[101px] justify-start items-center gap-2.5 flex">
                            <PiPencilSimpleFill className='text-[#2C3E50] 
                                                            w-[12px] h-[12px]
                                                            sm:w-[13px] sm:h-[13px]
                                                            md:w-[13px] md:h-[13px]
                                                            lg:w-[14px] lg:h-[14px]
                                                            xl:w-[14px] xl:h-[14px]' />
                        </div>
                    </div>
                    <div className="justify-center items-center gap-2.5 inline-flex">
                        <div className="text-[#7e7e8d] font-normal font-['DM Sans']
                                        text-xs
                                        sm:text-sm
                                        md:text-sm
                                        lg:text-base
                                        xl:text-base">www.digizenship.com/john332</div>
                    </div>
                </div>
            </div>

            {/*=== This is For 1920px in figma design ===*/}
            {/* <div className="w-[433px] h-20 px-3 py-5 bg-white border-b border-[#ecf1f4] justify-start items-center gap-2 inline-flex mt-3">
                <div className="rounded-lg flex-col justify-center items-start gap-1 inline-flex">
                    <div className="justify-start items-center gap-2 inline-flex">
                        <div className="text-[#2c3e50] text-base font-bold font-['DM Sans']">Profile Link</div>
                        <div className="p-1.5 bg-[#ecf1f4] rounded-[101px] justify-start items-center gap-2.5 flex">
                            <PiPencilSimpleFill className='w-[14.58316px] h-[14.58316px] text-[#2C3E50]' />
                        </div>
                    </div>
                    <div className="justify-center items-center gap-2.5 inline-flex">
                        <div className="text-[#7e7e8d] text-base font-normal font-['DM Sans'] leading-normal">www.digizenship.com/john332</div>
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default ProfileLink;