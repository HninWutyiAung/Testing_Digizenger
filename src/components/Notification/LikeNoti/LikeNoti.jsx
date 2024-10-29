import LikeNotiLayout from "./LikeNotiLayout"
import { selectNotification , setNotifications} from "../../../feature/notiSlice";
import { useAppSelector } from "../../../hook/Hook";
import { useGetAllNotiQuery } from "../../../apiService/Noti";
import { HandleNoti } from "./NotiService";
import { useEffect } from "react";


function Noti () {
    const allNoti = useAppSelector(selectNotification);
    const {data,isLoading,isSuccess,isError} = useGetAllNotiQuery();

    useEffect(() => {
        if (isSuccess && data) {
            HandleNoti(data);
        }
    }, [isSuccess, data]);

    if (isLoading) return <p>Loading profile...</p>;
    if (isError) return <p>Error loading profile: {data?.message || 'Unknown error'}</p>;

    console.log(data);
    console.log(allNoti);
    return(
        <section className="flex flex-col items-start self-stretch border-t-2 border-accent">
            <h2 className="text-[16px] font-bold leading-6 text-darkBlue p-[10px]">Today</h2>
            
                {allNoti.map((noti)=>{
                    return(
                        <LikeNotiLayout key={noti.id} noti={noti} />
                    )
                })}
            
            <h2 className="text-[16px] font-bold leading-6 text-darkBlue p-[10px]">Last 7 days</h2>
        </section>
    )
}

export default Noti;