import cover from '/images/cover.png';
import john from '/images/john doe.jpg';
import { useRef, useState } from 'react';
function ProfileCover (){
    const coverRef = useRef();
    const profileRef = useRef();
    const [coverImage, setcoverImage] = useState(null);
    const [coverImageUrl, setcoverImageUrl] = useState(null);
    console.log(coverImageUrl)

    const onChangeCover = (e)=> {
        const coverFile = e.target.files[0];
        if(coverFile){
            setcoverImage(coverFile);
            setcoverImageUrl(URL.createObjectURL(coverFile));
        }
    }

    const handleCoverImage = ()=>{
        coverRef.current.click();
    }
    return(
        <section className="flex flex-col items-center self-stretch bg-white gap-[28px] pb-[24px]">
            <div className="w-[640px] h-[240px] relative">
                <input type="file" ref={coverRef} onChange={onChangeCover} className='hidden'/>
                {/* <input ref={profileRef} className='hidden'/> */}
                {coverImageUrl ? (<img src={coverImageUrl} className="w-[640px] h-[180px]" onClick={handleCoverImage}/>) :(<img src={cover} onClick={handleCoverImage} className="w-[640px] h-[180px]"/>)}
                <div className='w-[180px] h-[180px] flex items-center justify-center absolute top-11 left-5 '>
                    <img src={john} className='w-[180px] h-[180px] rounded-full'></img>
                </div>
                

            </div>
            <div>
                
            </div>
            
        </section>
    )
}

export default ProfileCover;