export const handleMessageModelBox = (setModelBoxToggle, messageId) =>{
    setModelBoxToggle((prev) => (prev === messageId ? null : messageId));
    console.log("modal box is work")
}

export const handleReplyMessageId = (messageId , setActiveMessageId , activeMessageId) => {
    setActiveMessageId(messageId);
    console.log("this is original message id for reply" , activeMessageId);
    console.log("this is message id for reply" , messageId);

}