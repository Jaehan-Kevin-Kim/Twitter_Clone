import { authService, dbService } from 'fBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
  let history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  // const getMyTweets = async () => {
  //   //filter링 하는법 (profile화면에 해당 log in 한 user 정보를 표시하기 위해 해당 log in한 user가 맞는지 확인 해주는 기능)
  //   const tweets = await dbService
  //     .collection('tweets')
  //     .where('creatorId', '==', userObj.uid)
  //     .orderBy('createdAt')
  //     .get();

  //   console.log(tweets.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMyTweets();
  // }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // console.log(userObj.updateProfile);
      console.log(newDisplayName);
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type='text'
          placeholder='Display Name'
          value={newDisplayName}
        />
        <input type='submit' value='Update Profile' />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
