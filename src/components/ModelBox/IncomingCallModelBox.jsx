import { MdCallEnd } from "react-icons/md";
import { answerCall, selectAnswerCall } from "../../feature/modelBox";
import { useAppDispatch , useAppSelector } from "../../hook/Hook";
import default_profile from '../../../images/default_profile.jpg';
import { toggleIncomingCall } from "../../feature/modelBox";    

const IncomingCallBox = ({ setStartVideoCall, startVideoCall }) => {
    const dispatch = useAppDispatch();
    const kk = useAppSelector(selectAnswerCall);
    console.log("this is answerCall log from modelbox", kk);

    const handleVideoModelBox = () => {
        setStartVideoCall(!startVideoCall);
        dispatch(answerCall());
    };

    const closeModelBox = ( ) => {
        dispatch(toggleIncomingCall());
    }

    // Dynamic animation delay
    const buttons = [
        { color: "bg-red-500", hoverColor: "hover:bg-blue-600" },
        { color: "bg-green-500", hoverColor: "hover:bg-blue-600" },
    ];

    return (
        <div className="flex flex-col bg-darkBlue items-center justify-between rounded-lg h-[510px]">
            <div className="flex flex-col items-center justify-center mt-[70px] gap-[10px]">
                <h2 className="text-accent text-lg ml-[10px]">Coming Call ...</h2>
                <img src={default_profile} className="w-16 h-16 rounded-full"/>
            </div>
            <div className="flex gap-[20px] justify-center mb-[30px] ">
                {buttons.map((btn, index) => (
                    <button
                        key={index}
                        className={`p-[0.5rem] ${btn.color} ${btn.hoverColor} text-white font-bold rounded-full shadow-md emoji-animation`}
                        style={{ animationDelay: `${index * 0.2}s` }} // Dynamic delay
                        onClick={index === 1 ? handleVideoModelBox : closeModelBox} // Add handler for the second button
                    >
                        <MdCallEnd size={30} className="text-white" />
                    </button>
                ))}
            </div>
        </div>
    );
};


export default IncomingCallBox;