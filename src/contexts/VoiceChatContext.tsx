import React, {useContext, useEffect} from 'react';
import Peer from 'skyway-js';
import {useRef, useState} from "react";

const peer = new Peer({key: process.env.REACT_APP_SKYWAY_API_KEY || ''});

interface IContext {
  myId,
  peer,
}

const VoiceChatContext = React.createContext({} as IContext);

export const useVoiceChatContext = () => {
  return useContext(VoiceChatContext);
}

export const VoiceChatProvider: React.FC = ({children}) => {
  const [myId, setMyId] = useState('');
  const [callId, setCallId] = useState('');
  const [localStream, setLocalStream] = useState<MediaStream|null>(null);
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  // peer.on('call', (mediaConnection) => {
  //   if (localVideo.current) {
  //     mediaConnection.answer(localVideo.current!.srcObject as MediaStream);
  //
  //     mediaConnection.on('stream', async (stream) => {
  //       remoteVideo.current!.srcObject = stream
  //     })
  //   }
  // });

  peer.on('disconnected', () => {
    if (localVideo.current) {
      peer.disconnect();
      remoteVideo.current!.srcObject = null;
    }
  });

  const makeCall = () => {
    if (localVideo.current) {
      const mediaConnection = peer.call(callId, localVideo.current?.srcObject as MediaStream);
      console.log(mediaConnection);

      mediaConnection.on('stream', async (stream) => {
        remoteVideo.current!.srcObject = stream;
        await remoteVideo.current?.play().catch(() => console.error);
      })
    }
  }

  const value = {
    myId,
    peer,
  }

  return (
    <VoiceChatContext.Provider value={value}>
      {children}
    </VoiceChatContext.Provider>
  )
}
