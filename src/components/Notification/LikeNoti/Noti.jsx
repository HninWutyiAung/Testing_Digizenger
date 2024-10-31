import LikeNotiLayout from "./LikeNotiLayout"
import { selectNotification , setNotifications} from "../../../feature/notiSlice";
import { useAppSelector } from "../../../hook/Hook";
import { useGetAllNotiQuery } from "../../../apiService/Noti";
import { HandleNoti } from "./NotiService";
import { useEffect } from "react";
import FlickNotiLayout from "./FlickNotiLayout";
import BirthNotiLayout from "./BirthNotiLayout";
import FollowNotiLayout from "./FollowNotiLayout";


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

    const today = new Date(); // Get the current date once

  // Filter notifications within 1 day
    const recentNotis = allNoti.filter((noti) => {
        const notiDate = new Date(noti.createDate); // ISO format to Date object
        return (today - notiDate) <= 24 * 60 * 60 * 1000; // 1 day in milliseconds
    });

    // Filter notifications within 7 days but older than 1 day
    const weekOldNotis = allNoti.filter((noti) => {
        const notiDate = new Date(noti.createDate); // ISO format to Date object
        const timeDiff = today - notiDate;
        return timeDiff > 24 * 60 * 60 * 1000 && timeDiff <= 7 * 24 * 60 * 60 * 1000; // 1 to 7 days
    });

    console.log(weekOldNotis);
    console.log(recentNotis);

    console.log(data);
    console.log(allNoti);
    return(
        <section className="flex flex-col items-start self-stretch border-t-2 border-accent">
            <h2 className="text-[16px] font-bold leading-6 text-darkBlue p-[10px]">Today</h2>
            
                {recentNotis.map((noti)=>{
                    switch (noti.type) {
                        case 'flick':
                          return <FlickNotiLayout key={noti.id} noti={noti} />;
                        case 'LIKE':
                          return <LikeNotiLayout key={noti.id} noti={noti} />;
                        case 'birthday':
                          return <BirthNotiLayout key={noti.id} noti={noti} />;
                        case 'FOLLOW':
                          return <FollowNotiLayout key={noti.id} noti={noti} />;
                        default:
                          return null;
                      }
              
                })}
            
            <h2 className="text-[16px] font-bold leading-6 text-darkBlue p-[10px]">Last 7 days</h2>
                {weekOldNotis.map((noti)=>{
                    switch (noti.type) {
                        case 'flick':
                          return <FlickNotiLayout key={noti.id} noti={noti} />;
                        case 'LIKE':
                          return <LikeNotiLayout key={noti.id} noti={noti} />;
                        case 'birthday':
                          return <BirthNotiLayout key={noti.id} noti={noti} />;
                        default:
                          return null;
                      }
                })}
        </section>
    )
}

export default Noti;