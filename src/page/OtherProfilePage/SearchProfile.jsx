import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchProfileInput = () => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div
      className="h-11 px-[15px] py-2.5 bg-white rounded-lg border border-[#c9dcde] justify-start items-center gap-2.5 inline-flex focus-within:outline focus-within:outline-2 focus-within:outline-[#00BCD4]"
    >
      <HiMagnifyingGlass className="w-6 h-6 relative" />
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Search Profile"
        className={`w-full bg-transparent outline-none text-base font-normal font-['DM Sans'] leading-normal ${
          inputText ? "text-black" : "text-[#8c8ca1]"
        }`}
      />
    </div>
  );
};

export default SearchProfileInput;
