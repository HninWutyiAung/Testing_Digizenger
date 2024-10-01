import cover from '/images/cover.png';
function ProfileCover (){
    return(
        <section className="flex flex-col items-center self-stretch bg-white gap-[28px] pb-[24px]">
            <div className="w-[640px] h-[240px]">
                <img src={cover} className="w-[640px] h-[180px]"/>

            </div>
            <div>
                
            </div>
            
        </section>
    )
}

export default ProfileCover;