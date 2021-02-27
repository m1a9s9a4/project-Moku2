import React, {useEffect} from 'react';
import Peer from 'skyway-js';
import {useRef, useState} from "react";

const peer = new Peer({key: process.env.REACT_APP_SKYWAY_API_KEY || ''});

const VoiceChatContext: React.FC = () => {
  const [myId, setMyId] = useState('');
  const [callId, setCallId] = useState('');
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.on('open', () => {
      setMyId(peer.id);
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(localStream => {
        localVideo.current!.srcObject = localStream;
      })
    });
  }, []);

  peer.on('call', (mediaConnection) => {
    if (localVideo.current) {
      mediaConnection.answer(localVideo.current!.srcObject as MediaStream);

      mediaConnection.on('stream', async (stream) => {
        remoteVideo.current!.srcObject = stream
      })
    }
  });

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

  return (
    <>
      <h2>音声通話テスト</h2>
      <div>
        <video width="400px" muted autoPlay playsInline ref={localVideo} />
      </div>
      <div>{myId}</div>
      <div>
        <input value={callId} onChange={e => setCallId(e.target.value)} />
        <button onClick={makeCall}>電話する</button>
      </div>
      <div>
        <video width="400px" muted autoPlay playsInline ref={remoteVideo} />
      </div>
    </>
  )
}

export default VoiceChatContext;