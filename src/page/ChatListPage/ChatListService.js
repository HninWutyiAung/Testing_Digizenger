export let filteredMessages = [];
export let messageLoading;

export const filterMessageHandle = (chatHistoryData) =>{
   if(chatHistoryData){
    filteredMessages = chatHistoryData.singleChatMessageDtoList.map(msg => ({
        id: msg.id,
        message: msg.message,
        recipientId: msg.recipientId,
        type: msg.type,
        replyMessageType: msg.replayMessageType,
        replyMessage: msg.replyMessage,
        createDate: msg.createDate,
        userDto: {
            id: msg.userDto.id,
            firstName: msg.userDto.firstName,
            lastName: msg.userDto.lastName,
        },
        reactionDtoList: msg.reactionDtoList.map(reaction => ({
            id: reaction.id,
            emoji: reaction.emoji,
            createdDate: reaction.createdDate,
            editedDate: reaction.editedDate,
            userDto: {
                id: reaction.userDto.id,
                firstName: reaction.userDto.firstName,
                lastName: reaction.userDto.lastName,
            }
        }))
    }));
   }
}

export const handleLoading = (isFetching)=>{
    messageLoading = isFetching;
    console.log("chat is still loading");
}