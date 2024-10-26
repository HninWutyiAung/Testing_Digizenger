import LikeNotiLayout from "./LikeNotiLayout"

function LikeNoti () {
    return(
        <section className="flex flex-col items-start self-stretch border-t-2 border-accent">
            <h2>Today</h2>
            <LikeNotiLayout />
        </section>
    )
}

export default LikeNoti;