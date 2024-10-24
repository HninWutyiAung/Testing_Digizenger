import { useState, useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import { useVerifyEmailOrPhoneMutation , useResendCodeMutation} from "../../apiService/Auth";
import { useAppSelector } from "../../hook/Hook";
import { selectEmail,selectPhone } from "../../feature/authSlice";
import {RingLoader} from 'react-spinners';

function VerifyEmail (){

    const [code, setCode] = useState("");
    const [isTimeOut, setTimeOut] =useState(false);
    const [timer, setTimer] = useState("60");
    const [verifyEmailOrPhone,{isLoading: verifyLoading, isError, isSuccess}] = useVerifyEmailOrPhoneMutation();
    const [resendCode,{isLoading: resendLoading}] = useResendCodeMutation();
    const email = useAppSelector(selectEmail);
    const phone = useAppSelector(selectPhone);  
    const navigate = useNavigate();
    console.log(typeof code);



  useEffect(()=>{
    if (timer>0 ){
        const countDown = setTimeout(() => setTimer(timer-1),1000);
        return () => clearTimeout(countDown)
    } else {
        setTimeOut(true);
    }

  },[timer])

  const timeFormat = () =>{
    const minutes = Math.floor(timer / 60);
    const second =  timer % 60;
    return `${minutes}:${second < 10 ? "0":""}${second}`;
  }


  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
    }
  };

  const renderMaskedCode = () => {
    let maskedCode = code.split("").map((digit) => digit).join(" ");
    maskedCode += " - ".repeat(6 - code.length).trim();
    return maskedCode;
  };

  const handleVerify = async () => {
    const emailOrPhone = email || phone;

    if(code){
        try {
            const result = await verifyEmailOrPhone({ emailOrPhone: emailOrPhone, otp: Number(code) }).unwrap();
            console.log("Verification successful:", result);
        } catch (error) {
            console.error("Verification failed:", error);
        }

    }
};

useEffect(()=> {
    if(isSuccess){
        navigate("/");
    }
})

    const handleResendCode = async () => {
        const emailOrPhone = email || phone;
        try {
            const response = await resendCode(emailOrPhone).unwrap();
            console.log("Resend code successful" , response);
            setTimer(60); 
            setTimeOut(false);
        } catch (error) {
            console.error("Failed to resend code:", error);
        }
    };

    return(
        <section className="flex justify-center pt-[100px]">
            <main className="verify_header text-wrap max-width-[375px] px-[20px]">
                <div>
                    <article className="grid text-wrap ">
                        <h1 className=" text-[32px] font-semibold justify-self-start"><span className="text-[#00BCD4]">Verify </span> Your Email</h1>
                        <div className="verify_body text-slate-400 mt-[15px] mb-[15px] flex flex-col">
                            <span className="verify_text">We've emailed you a 4-digit code. Please check your</span>
                            <span className="verify_text self-start">inbox and enter it below.</span>
                        </div>
                    </article>
                </div>
                {verifyLoading && (
                    <div className="absolute left-[48%]">
                        <RingLoader color="#0097A7" size={50} loading={verifyLoading} />
                    </div>
                    )}
                {resendLoading && (
                    <div className="absolute left-[48%]">
                        <RingLoader color="#0097A7" size={50} loading={resendLoading} />
                        {console.log('Resend loading is active')}
                    </div>
                )}
                <div className="relative w-full mt-[20px] mb-[20px]">
                    <input
                    type="text"
                    value={code}
                    onChange={handleChange}
                    maxLength="6"
                    className="absolute inset-0 w-full  h-[40px]  pl-[7rem] bg-slate-300 opacity-[0.2] text-transparent caret-black outline-none"
                    style={{ letterSpacing: '1.5rem' }}
                    />
                    <div className="text-3xl w-full tracking-widest text-gray-500">{renderMaskedCode()}</div>
                </div>
                <p style={{ color: isTimeOut ? "red" : "black" }}>
                    {isTimeOut
                        ? <span>Time is up. <button onClick={handleResendCode} className={`text-blue-500 ${resendLoading ? 'cursor-not-allowed opacity-50' : ''}`}>Resend Code</button></span>
                        : `Time remaining: ${timeFormat(timer)}`}
                </p>
                
                    <button type="submit" onClick={handleVerify} className="bg-[#0097A7] w-full text-white py-2 px-6 rounded-lg mt-4">
                        Continue
                    </button>
                
                
                
            </main>
        </section>
    )
}

export default VerifyEmail;