import React from 'react';


const emojiCodes = ["1F44D", "1F60D", "1F602", "1F62E", "1F622"]; // Unicode codes for emojis

const EmojiReactions = ({handleReact}) => {
  return (
    <div  style={{ display: 'flex', gap: '10px' }}>
      {emojiCodes.map((code, index) => (
        <span key={index} style={{ fontSize: '24px' , animationDelay: `${index * 0.1}s`}} className='emoji-animation' onClick={() =>handleReact(code)}>
          {String.fromCodePoint(parseInt(code, 16))} {/* Convert code to emoji */}
        </span>
      ))}
    </div>
  );
};

export default EmojiReactions;