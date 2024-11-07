import { createPortal } from 'react-dom';

const DropdownBox = ({ isBoxVisible, toggleBox }) => {
  if (!isBoxVisible) return null;

  return createPortal(
    <div
      className="fixed w-48 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
      style={{
        top: toggleBox.y,
        left: toggleBox.x,
      }}
    >
      <ul className="space-y-2 text-sm text-[#2c3e50]">
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#0097a7]">
          <span>🔗</span> Copy profile link
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#0097a7]">
          <span>⚠️</span> Report profile
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-[#0097a7]">
          <span>🚫</span> Unfollow Emma Noble
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:text-red-600">
          <span>🔴</span> Block Emma Noble
        </li>
      </ul>
    </div>,
    document.body
  );
};
