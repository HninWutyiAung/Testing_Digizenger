import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetOtherProfileQuery } from '../../apiService/Profile';
import { OtherProfileData , otherProfileDetail } from './OtherProfilePage';

const OtherProfileComponent = () => {
  const { otherUserName } = useParams(); 
  const { data, isLoading, isError } = useGetOtherProfileQuery(otherUserName);

  OtherProfileData(data);

  if (isLoading) return <p>Loading profile...</p>;

  if (isError) return <p>Error loading profile: {data?.message || 'Unknown error'}</p>;

  return (
    <section className='bg-accent'>
      <div className='flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive'>
            {otherProfileDetail && (
              <div>
                <h1>{otherProfileDetail.otherProfileDto.username}</h1>
                <div>Not Availiable</div>
              </div>
            )}
      </div>
    </section>
  );
};

export default OtherProfileComponent;
