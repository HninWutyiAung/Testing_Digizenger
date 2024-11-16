import { selectChatList } from "../../feature/chatSlice";
import { useAppDispatch, useAppSelector } from "../../hook/Hook";

const OriginalMessagePreview = ({activeMessageId}) => {
    const chatList = useAppSelector(selectChatList);
    const originalMessage = chatList.find((chat) =>
        chat.messages.some((msg) => msg.id === activeMessageId)
    );

    const originalText = originalMessage?.messages.find((msg) => msg.id === activeMessageId);

    console.log("this is original message", originalText);
    return(
        <div>
            <div>{originalText.message}</div>
        </div>
    )
}

export default OriginalMessagePreview;