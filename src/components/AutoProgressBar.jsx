import React, { useImperativeHandle, forwardRef } from 'react';

const AutoplayProgress = forwardRef(({ progress, timeLeft }, ref) => {
  useImperativeHandle(ref, () => ({
    reset: () => {
      // Implement reset logic if needed
    },
  }));

  return (
    <div className="autoplay-progress">
      <div className="progress-bar" style={{ width: `${(1 - progress) * 100}%` }}></div>
      <span>{Math.ceil(timeLeft / 1000)}s</span>
      <style jsx>{`
        .autoplay-progress {
          position: absolute;
          bottom: 0; /* Adjust as needed */
          left: 5px; /* Adjust as needed */
          width: 100%;
          height: 4px; /* Height of progress bar */
          background: rgba(0, 0, 0, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: #00BCD4; /* Customize your progress color */
          position: absolute;
          top: 0;
          left: 0; /* Start from the left */
          transition: width 0.1s linear; /* Smooth transition */
        }
      `}</style>
    </div>
  );
});

export default AutoplayProgress;
