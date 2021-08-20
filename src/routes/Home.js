import { dbService } from 'fBase';
import React, { useState } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("emails").add({
      nweet,
      createdAt: Date.now()
    })
    setNweet("");
  }
  const onChange = (event) => {
    const { target: {value}} = event;
    setNweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxlength={120} />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;