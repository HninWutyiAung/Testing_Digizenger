import { PiCopy } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsReplyAll } from "react-icons/bs";
import { TiArrowForwardOutline } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { setActiveMessageId , selectActiveMessageId } from "../../feature/chatSlice";
import { useAppDispatch, useAppSelector } from "../../hook/Hook";


const MessageModalBox = ({messageId , handleModelBox}) => {
    const activeMessageId = useAppSelector(selectActiveMessageId);
    const dispatch = useAppDispatch();

    const handleReplyMessageId = (messageId) => {
        dispatch(setActiveMessageId(messageId));
        handleModelBox(messageId);
    }

    return (
            <div className='flex flex-col pl-[15px] pr-[40px] py-[5px] items-start gap-[10px]'>
                <div className='flex items-center gap-[8px] text-darkBlue' onClick={() => handleReplyMessageId(messageId)}>
                    <i><BsReplyAll size={20}/></i>
                    <div>Reply</div>
                </div>
                <div className='flex items-center gap-[8px] text-darkBlue'>
                    <i><PiCopy size={20}/></i>
                    <div>Copy</div>
                </div>
                <div className='flex items-center gap-[8px] text-darkBlue'>
                    <i><MdOutlineModeEdit size={20}/></i>
                    <div>Edit</div>
                </div>
                <div className='flex items-center gap-[8px] text-darkBlue'>
                    <i><TiArrowForwardOutline size={20}/></i>
                    <div>Forward</div>
                </div>
                <div className='flex items-center gap-[8px] text-red-400'>
                    <i><AiOutlineDelete size={20}/></i>
                    <div>Unsend</div>
                </div>

            </div>
    )
}

export default MessageModalBox;