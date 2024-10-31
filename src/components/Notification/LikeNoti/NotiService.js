import { store } from "../../../feature/store";
import { setNotifications } from "../../../feature/notiSlice";

export let unreadNotiCount;

export function HandleNoti(data) {
    if (data.notificationDtoList) {

        unreadNotiCount= data.unreadNotificationCount;
        const notifications = data.notificationDtoList.map((noti) => ({
            id: noti.id,
            message: noti.message,
            createDate: noti.createDate, 
            type: noti.type, 
            userId: noti.userId, 
            read: noti.read,
        }));

        if (notifications.length > 0) {
            store.dispatch(setNotifications(notifications));
        }
    }
}
