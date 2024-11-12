export let filteredMessages = [];
export let messageLoading;

export const filterMessageHandle = (chatHistoryData) =>{
   if(chatHistoryData){
    filteredMessages = chatHistoryData.singleChatMessageDtoList.map(msg => ({
        id: msg.id,
        message: msg.message,
        recipientId: msg.recipientId,
        type: msg.type,
        replayMessageType: msg.userDto?.replayMessageType,
        replyMessage: msg.userDto?.replyMessage,
        createDate: msg.createDate,
        userDto: {
            id: msg.userDto.id,
            firstName: msg.userDto.firstName,
            lastName: msg.userDto.lastName,
        },
    }));
   }
}

export const handleLoading = (isFetching)=>{
    messageLoading = isFetching;
    console.log("chat is still loading");
}