import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../apiService/Auth.ts";
import { useAppDispatch, useAppSelector } from "../../hook/Hook.ts";
import {
  setEmailOrPhone,
  setRegisterInfo,
  selectEmail,
  selectLastName,
  selectFirstName,
} from "../../feature/authSlice.ts";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { selectPhone } from "../../feature/authSlice.ts";
// import { validForm } from "./authService.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  country: "",
  city: "",
  confirmPass: "",
};

function SignInfo() {
  const currentYear = new Date().getFullYear();
  const [inputValue, setInputValue] = useState("");
  const [formValue, setFormValue] = useState(initialState);
  const [radioButton, setRadioButton] = useState();
  const [checked, setChecked] = useState(false);
  const [ispassword, setpassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [inputBackground, setInputBackground] = useState();
  const {
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    gender,
    country,
    city,
    password,
    confirmPass,
  } = formValue;
  const [registerUser, { data: registerData, isSuccess, isLoading, isError }] =
    useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector(selectEmail);
  const phoneValue = useAppSelector(selectPhone);

  const [validationErrors, setValidationErrors] = useState({});

  const generateDays = () => Array.from({ length: 31 }, (_, i) => i + 1);
  const generateMonths = () => Array.from({ length: 12 }, (_, i) => i + 1);
  const generateYears = () =>
    Array.from({ length: 50 }, (_, i) => currentYear - i);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  function isEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  }

  function isPhoneNumber(input) {
    const phonePattern = /^\+?[0-9]{7,15}$/;
    return phonePattern.test(input);
  }

  const isValidCity = (input) => /^[a-zA-Z\s]*$/.test(input);

  const isValidPassword = (input) => input.length >= 8 && input.length <= 100;

  const radioHandle = (e) => {
    const selectedGender = e.target.value;
    setRadioButton(selectedGender);
    setFormValue((prevForm) => ({
      ...prevForm,
      gender: selectedGender,
    }));
    setValidationErrors({ ...validationErrors, gender: false });
  };

  const checkHandle = (e) => {
    setChecked(!checked);
  };

  const inputHandle = (inputName) => {
    setInputBackground(inputName);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest("input")) {
      setInputBackground(null);
    }
  };

  const formHandleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const isEmailInput = isEmail(value);
      const isPhoneInput = isPhoneNumber(value);

      setFormValue((prevForm) => ({
        ...prevForm,
        email: isEmailInput ? value : "",
        phone: isPhoneInput ? value : "",
      }));

      setInputValue(value);

      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (!isEmailInput && !isPhoneInput && value.trim() !== "") {
          newErrors.email = "Please enter a valid email or phone number";
        } else {
          delete newErrors.email;
        }
        return newErrors;
      });
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        if (name === "firstName") {
          if (!value.trim()) newErrors.firstName = "First Name is required";
          else delete newErrors.firstName;
        }

        if (name === "lastName") {
          if (!value.trim()) newErrors.lastName = "Last Name is required";
          else delete newErrors.lastName;
        }

        if (name === "country") {
          if (!value.trim()) newErrors.country = "Country is required";
          else delete newErrors.country;
        }

        if (name === "city") {
          if (!value.trim()) {
            newErrors.city = "City is required";
          } else if (!isValidCity(value)) {
            newErrors.city = "City name cannot contain special characters";
          } else {
            delete newErrors.city;
          }
        }

        if (name === "password") {
          if (!isValidPassword(value)) {
            newErrors.password = "Password must be 8-100 characters long";
          } else if (/\s/.test(value)) {
            newErrors.password = "Password cannot contain spaces";
          } else {
            delete newErrors.password;
          }

          if (formValue.confirmPass && formValue.confirmPass !== value) {
            newErrors.confirmPass = "Passwords do not match";
          } else if (formValue.confirmPass === value) {
            delete newErrors.confirmPass;
          }
        }

        if (name === "confirmPass") {
          if (value !== formValue.password) {
            newErrors.confirmPass = "Passwords do not match";
          } else {
            delete newErrors.confirmPass;
          }
        }

        if (name === "day" && (value < 1 || value > 31)) {
          newErrors.day = "Invalid day";
        } else if (name === "day") {
          delete newErrors.day;
        }

        if (name === "month" && (value < 1 || value > 12)) {
          newErrors.month = "Invalid month";
        } else if (name === "month") {
          delete newErrors.month;
        }

        if (name === "year") {
          const selectedYear = parseInt(value, 10);
          if (selectedYear < currentYear - 100 || selectedYear > currentYear) {
            newErrors.year = "Invalid year";
          } else {
            delete newErrors.year;
          }
        }

        return newErrors;
      });
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "password",
      "confirmPass",
      "gender",
      "country",
      "city",
      "dateOfBirth",
    ];

    if (!selectedDay) errors.day = "Day is required";
    if (!selectedMonth) errors.month = "Month is required";
    if (!selectedYear) errors.year = "Year is required";

    requiredFields.forEach((field) => {
      if (!formValue[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (!email && !phone) {
      errors.email = "Either email or phone number is required";
    }

    if (formValue.password !== formValue.confirmPass) {
      errors.confirmPass = "Passwords do not match";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (email) {
        dispatch(
          setEmailOrPhone({ email: email, phone: null, firstName, lastName })
        );
        console.log(email);
      } else if (phone) {
        dispatch(
          setEmailOrPhone({ email: null, phone: phone, firstName, lastName })
        );
        console.log(phone);
      }

      if (password === confirmPass) {
        try {
          const response = await registerUser({
            firstName,
            lastName,
            email,
            password,
            phone,
            dateOfBirth,
            gender,
            country,
            city,
          }).unwrap();
          console.log("Registration successful:", response);

          if (response.data) {
            navigate("/signup/verify");
          }
        } catch (error) {
          console.error(
            "Registration failed:",
            error.response ? error.response.data : error
          );
        }
      } else {
        console.log("Passwords do not match.");
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/signup/verify");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      console.error(
        "Registration failed:",
        registerData || "No additional data available"
      );
    }
  }, [isError]);

  const handleDateChange = (type, value) => {
    const [year = "", month = "", day = ""] = dateOfBirth.split("-");

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (type === "day") {
        setFormValue((prevForm) => ({
          ...prevForm,
          dateOfBirth: `${year}-${month}-${value.padStart(2, "0")}`,
        }));
        setSelectedDay(value);
        if (value) delete newErrors.day;
      } else if (type === "month") {
        setFormValue((prevForm) => ({
          ...prevForm,
          dateOfBirth: `${year}-${value.padStart(2, "0")}-${day}`,
        }));
        setSelectedMonth(value);
        if (value) delete newErrors.month;
      } else if (type === "year") {
        setFormValue((prevForm) => ({
          ...prevForm,
          dateOfBirth: `${value}-${month}-${day}`,
        }));
        setSelectedYear(value);
        if (value) delete newErrors.year;
      }
      return newErrors;
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const inputClass = (field, width = "w-[150px]") => {
    const hasError = validationErrors[field];
    const isFocused = inputBackground === field;

    return `${width} h-[40px] pl-[10px] rounded-[5px] outline-[#00BCD4] ${
      isFocused ? "bg-white" : "bg-[#ECF1F4]"
    } ${hasError ? "border-2 border-red-600" : ""}`;
  };

  return (
    <section
      className="flex  justify-center  container W-full  mb-[20px] pt-[100px]"
      onClick={handleClickOutside}
    >
      {isLoading && (
        <div className="absolute flex justify-center items-center z-50">
          <LoadingSpinner />
        </div>
      )}
      <main className="text-center ml-[5rem] user_info_container">
        <div className="mt-[-10px] grid  w-[400px] ml-[6rem] mb-[20px] ">
          <div className=" text-[36px] header_container font-bold mt-[-10px]">
            <span className="user_info_header1 text-[#00BCD4] ml-[-2rem]">
              Tell us more{" "}
            </span>
            <span className="user_info_header2 ">about you</span>
          </div>
          <div className="user_info_body_text text-left ml-[5px] w-[400px] text-[#8C8CA1] mt-[5px]">
            Fill in your detail to create your account.
          </div>
        </div>

        <form className="user_info_form_container  grid grid-cols-2 gap-2 px-4">
          <div className="user_info_form1_container space-y-4 px-5 mt-4 ml-16 ">
            <div className="user_info_input_container flex gap-4">
              <div className="grid w-full">
                <label className="block place-self-start text-slate-500 mb-[10px]">
                  First Name{" "}
                  <span className="text-[#e72020] text-base font-normal">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onClick={() => inputHandle("firstName")}
                  onChange={formHandleChange}
                  className={inputClass("firstName")}
                />
                <div className="h-[1rem]">
                  {validationErrors.firstName && (
                    <p className="text-red-600 text-xs text-left">
                      {validationErrors.firstName}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid">
                <label className="block place-self-start text-slate-500 mb-[10px]">
                  Last Name{" "}
                  <span className="text-[#e72020] text-base font-normal">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onClick={() => inputHandle("lastName")}
                  onChange={formHandleChange}
                  className={inputClass("lastName")}
                />
                <div className="h-[1rem]">
                  {validationErrors.lastName && (
                    <p className="text-red-600 text-xs text-left">
                      {validationErrors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid">
              <label className="block place-self-start text-slate-500 mb-[10px]">
                Email Or Phone Number{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <input
                type="text"
                name="email"
                value={inputValue}
                onClick={() => inputHandle("email")}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  formHandleChange(e);
                }}
                className={inputClass("email", "w-[315px]")}
              />
              <div className="h-[1rem]">
                {validationErrors.email && (
                  <p className="text-red-600 text-xs text-left">
                    {validationErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid">
              <label className="block place-self-start text-slate-500 mb-[10px]">
                Date Of Birth{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <div className="flex gap-3">
                <div className="grid">
                  <select
                    id="day"
                    name="day"
                    value={selectedDay}
                    className={`w-[96.5px] h-[40px] px-[10px] border-2 rounded-[5px] 
    ${validationErrors.dateOfBirth && !selectedDay ? "border-red-600" : ""}
    ${
      selectedDay
        ? "border-[#ECF1F4] text-black-900"
        : "border-[#ECF1F4] text-slate-400"
    }
    ${
      inputBackground === "day"
        ? "focus:border-[#00BCD4] bg-white"
        : "bg-[#ECF1F4]"
    }
    focus:border-[#00BCD4] focus:outline-none focus:ring-[#00BCD4]`}
                    onFocus={() => inputHandle("day")}
                    onBlur={() => setInputBackground("")}
                    onChange={(e) => handleDateChange("day", e.target.value)}
                  >
                    <option value="">Day</option>
                    {generateDays().map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <div className="h-[1rem]">
                    {validationErrors.day && (
                      <p className="text-red-600 text-xs text-left">
                        {validationErrors.day}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid">
                  <select
                    id="month"
                    name="month"
                    value={selectedMonth}
                    className={`w-[96.5px] h-[40px] px-[10px] border-2 rounded-[5px] 
    ${validationErrors.dateOfBirth && !selectedMonth ? "border-red-600" : ""}
    ${
      selectedMonth
        ? "border-[#ECF1F4] text-black-900"
        : "border-[#ECF1F4] text-slate-400"
    }
    ${
      inputBackground === "day"
        ? "focus:border-[#00BCD4] bg-white"
        : "bg-[#ECF1F4]"
    }
    focus:border-[#00BCD4] focus:outline-none focus:ring-[#00BCD4]`}
                    onFocus={() => inputHandle("month")}
                    onBlur={() => setInputBackground("")}
                    onChange={(e) => handleDateChange("month", e.target.value)}
                  >
                    <option value="">Month</option>
                    {generateMonths().map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <div className="h-[1rem]">
                    {validationErrors.month && (
                      <p className="text-red-600 text-xs text-left">
                        {validationErrors.month}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid">
                  <select
                    id="year"
                    name="year"
                    value={selectedYear}
                    className={`w-[96.5px] h-[40px] px-[10px] border-2 rounded-[5px] 
    ${validationErrors.dateOfBirth && !selectedYear ? "border-red-600" : ""}
    ${
      selectedYear
        ? "border-[#ECF1F4] text-black-900"
        : "border-[#ECF1F4] text-slate-400"
    }
    ${
      inputBackground === "day"
        ? "focus:border-[#00BCD4] bg-white"
        : "bg-[#ECF1F4]"
    }
    focus:border-[#00BCD4] focus:outline-none focus:ring-[#00BCD4]`}
                    onFocus={() => inputHandle("year")}
                    onBlur={() => setInputBackground("")}
                    onChange={(e) => handleDateChange("year", e.target.value)}
                  >
                    <option value="">Year</option>
                    {generateYears().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="h-[1rem]">
                    {validationErrors.year && (
                      <p className="text-red-600 text-xs text-left">
                        {validationErrors.year}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid">
              <label className="block place-self-start text-slate-500 mb-[10px]">
                Gender{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <div className="flex gap-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={radioButton === "MALE"}
                    onChange={radioHandle}
                    className={`bg-[#ECF1F4]  h-[18px] w-[19px] rounded-[50px] appearance-none relative ${
                      radioButton === "MALE"
                        ? "radio_check border-2  border-[#00BCD4]"
                        : " "
                    } ${
                      validationErrors.gender ? "border-2 border-red-600" : ""
                    }`}
                  />
                  <label className="ml-[10px] mr-[20px] place-self-center">
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={radioButton === "FEMALE"}
                    onChange={radioHandle}
                    className={`bg-[#ECF1F4]  h-[18px] w-[19px] rounded-[50px] relative appearance-none ${
                      radioButton === "FEMALE"
                        ? "border-2 border-[#00BCD4] radio_check"
                        : " "
                    } ${
                      validationErrors.gender ? "border-2 border-red-600" : ""
                    }`}
                  />
                  <label className="ml-[10px] mr-[20px] ">Female</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="OTHER"
                    checked={radioButton === "OTHER"}
                    onChange={radioHandle}
                    className={`bg-[#ECF1F4]  h-[18px] w-[19px] rounded-[50px] appearance-none relative ${
                      radioButton === "OTHER"
                        ? "border-2 border-[#00BCD4]  radio_check "
                        : " "
                    } ${
                      validationErrors.gender ? "border-2 border-red-600" : ""
                    }`}
                  />
                  <label className="ml-[10px] mr-[20px]">Other</label>
                </div>
              </div>
              <div className="h-[1rem]">
                {validationErrors.gender && (
                  <p className="text-red-600 text-xs text-left">
                    {validationErrors.gender}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="user_info_form2_container space-y-4 px-5 mt-4">
            <div className="grid">
              <label className="block place-self-start text-slate-500 mb-[10px]">
                Country{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <select
                id="options"
                name="country"
                value={country}
                onChange={formHandleChange}
                className={`w-[315px] h-[40px] px-[10px] border-2 rounded-[5px] 
      ${validationErrors.country ? "border-red-600" : "border-[#ECF1F4]"}
      ${country ? "text-black" : "text-slate-400"} 
      ${
        inputBackground === "country"
          ? "focus:border-[#00BCD4] bg-white"
          : "bg-[#ECF1F4]"
      }
      focus:border-[#00BCD4] focus:outline-none focus:ring-[#00BCD4]`}
                onFocus={() => inputHandle("country")}
                onBlur={() => setInputBackground("")}
              >
                <option value="">Select your country</option>
                <option value="thailand">Thailand</option>
                <option value="thai">Thai</option>
                <option value="singapore">Singapore</option>
                <option value="chinese">Chinese</option>
              </select>
              <div className="h-[1rem]">
                {validationErrors.country && (
                  <p className="text-red-600 text-xs text-left">
                    {validationErrors.country}
                  </p>
                )}
              </div>
            </div>

            <div className="grid">
              <label className="block place-self-start text-slate-500 mb-[10px]">
                City{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={city}
                onClick={() => inputHandle("city")}
                onChange={formHandleChange}
                className={inputClass("city", "w-[315px]")}
              />
              <div className="h-[1rem]">
                {validationErrors.city && (
                  <p className="text-red-600 text-xs text-left">
                    {validationErrors.city}
                  </p>
                )}
              </div>
            </div>
            <div className="grid relative">
              <label className="block place-self-start  text-slate-500 mb-[10px]">
                Password{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <input
                type={ispassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={formHandleChange}
                className={inputClass("password", "w-[315px]")}
              />

              {ispassword ? (
                <button
                  className="eye1 absolute top-[3rem] left-[17.5rem]"
                  onClick={(e) => {
                    e.preventDefault();
                    setpassword(!ispassword);
                  }}
                >
                  <FaRegEye />
                </button>
              ) : (
                <button
                  className="eye2 absolute top-[3rem] right-[5rem]"
                  onClick={(e) => {
                    e.preventDefault();
                    setpassword(!ispassword);
                  }}
                >
                  <FaRegEyeSlash />
                </button>
              )}
              <div className="h-[1rem]">
                {validationErrors.password && (
                  <p className="text-red-600 text-xs text-left">
                    {validationErrors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="grid relative">
              <label className="block place-self-start text-slate-500 mb-[10px]">
                Confirm Password{" "}
                <span className="text-[#e72020] text-base font-normal">*</span>
              </label>
              <input
                type={confirmPassword ? "text" : "password"}
                name="confirmPass"
                value={confirmPass}
                onChange={formHandleChange}
                className={inputClass("confirmPass", "w-[315px]")}
              />
              {confirmPassword ? (
                <button
                  className="eye1 absolute top-[3rem] left-[17.5rem]"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmPassword(!confirmPassword);
                  }}
                >
                  <FaRegEye />
                </button>
              ) : (
                <button
                  className="eye2 absolute top-[3rem] right-[5rem]"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmPassword(!confirmPassword);
                  }}
                >
                  <FaRegEyeSlash />
                </button>
              )}
              <div className="h-[1rem]">
                {validationErrors.confirmPass && (
                  <p className="text-red-600 text-xs text-left">
                    {validationErrors.confirmPass}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="user_info_button_container flex flex-col justify-start mt-8 ml-[6.5rem] w-[645px]">
          <div className=" user_button_container text-left flex relative">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              onChange={checkHandle}
              className={`h-[20px] w-[35px] appearance-none mr-2 ${
                checked ? " bg-[#00BCD4] " : "bg-[#ECF1F4] "
              } cursor-pointer `}
            />

            <div
              className={`absolute inset-0 flex check_icon items-center top-[-1.9rem] pointer-events-none ${
                checked ? "opacity-100" : "opacity-0"
              }`}
            >
              <IoIosCheckmark className="text-white text-xl" />
            </div>
            <label
              htmlFor="agree"
              className="user_info_agree text-[#8C8CA1] ml-2  text-left"
            >
              By singing up,you accept our terms,privacy policy and cookie
              policy. policy and cookie policy.policy and cookie policy
            </label>
          </div>
          <button
            type="submit"
            disabled={!checked}
            onClick={formSubmit}
            className={`w-[315px] user_info_button px-14 py-1 mt-[20px] text-lg  font-semibold  bg-[#0097A7] text-white rounded-md ${
              checked
                ? "opacity-1 cursor-pointer "
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            <span className=" flex items-center justify-center w-full  h-full">
              Sign Up
            </span>
          </button>
        </div>
      </main>
    </section>
  );
}

export default SignInfo;
