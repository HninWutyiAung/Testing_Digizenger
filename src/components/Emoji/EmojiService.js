export const handleEmojiToggle = (setEmojiToggle, messageId) =>{
    setEmojiToggle((prev) => (prev === messageId ? null : messageId));
    console.log("this emoji is work")
}