'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

function capitalize(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const ChatForum = ({slug}) => {
  const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY;
  const [channel, setChannel] = useState();
  const [chatUser, setChatUser] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    const connectGuest = async () => {
      const storedId = window.localStorage.getItem('agriGuardianChatUserId');
      const userId = storedId || `guest_${crypto.randomUUID().replaceAll('-', '')}`;

      if (!storedId) {
        window.localStorage.setItem('agriGuardianChatUserId', userId);
      }

      const userName = `Guest ${userId.slice(-4)}`;
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, name: userName, slug }),
      });

      if (!response.ok) {
        throw new Error('Unable to connect to the discussion forum.');
      }

      const { token } = await response.json();
      setChatUser({
        id: userId,
        name: userName,
        image: `https://getstream.io/random_png/?name=${userName}`,
        token,
      });
    };

    connectGuest().catch((connectionError) => setError(connectionError.message));
  }, [slug]);

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: chatUser?.token,
    userData: chatUser,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel('messaging', slug, {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(slug)+' Discussion',
    });

    setChannel(channel);
    
  }, [client]);


  if (error) return <div>{error}</div>;
  if (!client || !channel) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}

export default ChatForum
