import React, { useEffect, useState } from 'react';

import Tweet from 'components/Tweet';
import { dbService } from 'fBase';
import TweetFactory from 'components/TweetFactory';

const Home = ({ userObj }) => {
  // console.log(userObj);

  const [tweets, setTweets] = useState([]);

  // const getTweets = async () => {
  //   const dbTweets = await dbService.collection('tweets').get();
  //   // console.log(dbTweets);
  //   // dbTweets.forEach((document) => console.log(document.data()));
  //   dbTweets.forEach((document) => {
  //     const tweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets((prev) => [tweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getTweets();

    //아래 처럼 하거나 아니면 위에 것 처럼 하면 됨.
    dbService.collection('tweets').onSnapshot((snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(tweetArray);
      setTweets(tweetArray);

      // console.log(snapshot.docs);
    });
  }, []);

  return (
    <div>
      <TweetFactory userObj={userObj} />
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
