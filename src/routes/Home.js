import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Tweet from 'components/Tweet';
import { dbService, storageService } from 'fBase';

const Home = ({ userObj }) => {
  // console.log(userObj);
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState('');
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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';

    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection('tweets').add(tweetObj);
    setTweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  // console.log(tweets);

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    // console.log(files);
    const theFile = files[0];
    // console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='file' accept='image/*' onChange={onFileChange} />
        <input type='submit' value='Tweet' />
        {attachment && (
          <div>
            <img src={attachment} width='50px' height='50px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
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
