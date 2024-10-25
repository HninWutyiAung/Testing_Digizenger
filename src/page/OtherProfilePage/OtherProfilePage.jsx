import { useParams } from 'react-router-dom';

const OtherProfile = () => {
  const { otherUserName } = useParams();
  console.log(otherUserName); // This should log the username in the console
  return (
    <div>
      <h1>Other Profile of {otherUserName}</h1>
    </div>
  );
};

export default OtherProfile;