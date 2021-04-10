import { authService, dbService } from 'fBase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj }) => {
  let history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyTweets = async () => {
    //filter링 하는법 (profile화면에 해당 log in 한 user 정보를 표시하기 위해 해당 log in한 user가 맞는지 확인 해주는 기능)
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj.uid)
      .orderBy('createdAt')
      .get();

    console.log(tweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
