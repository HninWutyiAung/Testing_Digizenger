import MenuNav from '../../components/NewFeed Nav/MenuNav2';
import NewFeedNav from '../../components/NewFeed Nav/NewFeedNav';
import OtherProfileComponent from './OtherProfile';
import SearchProfile from './SearchProfile';
const OtherProfile = () => {

  return (
    <section className='bg-accent'>
      <NewFeedNav />
      <MenuNav />
      <div className='flex flex-col p-[20px] pt-[140px] gap-[12px] w-full bg-[#ECF1F4] h-[945px] overflow-y-auto scrollable newfeed-responsive'>
            <SearchProfile/>
            <OtherProfileComponent/>
      </div>
    </section>
  );
};

export default OtherProfile;
