import { selectChatList } from "../../feature/chatSlice";
import { useAppDispatch, useAppSelector } from "../../hook/Hook";
import { IoCloseOutline } from "react-icons/io5";
import { setActiveMessageId } from "../../feature/chatSlice";

const OriginalMessagePreview = ({activeMessageId}) => {
    const chatList = useAppSelector(selectChatList);
    const dispatch = useAppDispatch();
    const originalMessage = chatList.find((chat) =>
        chat.messages.some((msg) => msg.id === activeMessageId)
    );

    const closeOriginalMessage = () => {
        dispatch(setActiveMessageId(null));
    }
    const originalText = originalMessage?.messages.find((msg) => msg.id === activeMessageId);

    console.log("this is original message", originalText);
    return(
        <div className="flex items-center justify-between bg-blue-100 text-darkBlue w-full py-[10px]">
            <div className="ml-[20px]">{originalText.message}</div>
            <i className="mr-[30px]" onClick={closeOriginalMessage}><IoCloseOutline size={20}/></i>
        </div>
    )
}

export default OriginalMessagePreview;