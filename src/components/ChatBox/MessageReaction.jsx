import React, { useEffect, useState } from 'react';

const MessageReactions = ({ text, reactionList = [], reactionDtoList = [], userId }) => {
    const localApiEmoji = reactionDtoList.filter((reaction) => reaction.userDto.id === userId);
    const webApiEmoji = reactionDtoList.filter((reaction) => reaction.userDto.id !== userId);

    console.log('localApiEmoji', localApiEmoji);
    console.log('webApiEmoji', webApiEmoji);
    console.log("localApiEmoji[0]?.emoji", localApiEmoji[0]?.emoji);
    console.log("webApiEmoji[0]?.emoji", webApiEmoji[0]?.emoji);
  return (
    <div>
      {reactionList
                            .filter((reaction) => reaction.messageId === text.id)
                            .map((reaction, index) => {
                            
                            const websocketEmojiCode = reaction.emojiUtf8[0] || webApiEmoji[0]?.emoji; 
                            const localEmojiCode = reaction.emojiUtf8[1] || localApiEmoji[0]?.emoji;
                            const websocketEmoji = websocketEmojiCode ? String.fromCodePoint(parseInt(websocketEmojiCode, 16)) : '';
                            const localEmoji = localEmojiCode ? String.fromCodePoint(parseInt(localEmojiCode, 16)) : '';
                    
                            return (
                                <div key={index} className={`text-[20px] flex gap-[8px] rounded-md mt-[3px] ${text.recipientId === userId ? "ml-[3.5rem]" : "mr-[0.5rem]"}`}>
                                    {websocketEmoji && (
                                        <div className="rounded-md bg-secondary">
                                            <span  className="emoji">{websocketEmoji}</span>
                                        </div>
                                    )}
                    
                                    {localEmoji && (
                                        <div className="rounded-md bg-primary">
                                            <span  className="emoji">{localEmoji}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
    </div>
  );
};

export default MessageReactions;
