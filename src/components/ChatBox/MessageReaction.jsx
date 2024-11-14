import React from 'react';

const MessageReactions = ({ text, reactionList = [], reactionDtoList = [], userId }) => {

    const localApiEmoji = reactionDtoList.find((reaction) => reaction.userDto.id === userId)?.emoji;
    const webApiEmoji = reactionDtoList.find((reaction) => reaction.userDto.id !== userId)?.emoji;

    const websocketEmojiCode = reactionList.find((reaction) => reaction.messageId === text.id)?.emojiUtf8[0] || webApiEmoji;
    const localEmojiCode = reactionList.find((reaction) => reaction.messageId === text.id)?.emojiUtf8[1] || localApiEmoji;

    const websocketEmoji = websocketEmojiCode ? String.fromCodePoint(parseInt(websocketEmojiCode, 16)) : '';
    const localEmoji = localEmojiCode ? String.fromCodePoint(parseInt(localEmojiCode, 16)) : '';

    return (
        <div className={`text-[20px] flex gap-[8px] rounded-md mt-[3px] ${text.recipientId === userId ? "ml-[3.5rem]" : "mr-[0.5rem]"}`}>
            {websocketEmoji && (
                <div className="rounded-md bg-secondary">
                    <span className="emoji">{websocketEmoji}</span>
                </div>
            )}
            {localEmoji && (
                <div className="rounded-md bg-primary">
                    <span className="emoji">{localEmoji}</span>
                </div>
            )}
        </div>
    );
};

export default MessageReactions;
