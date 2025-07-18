import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const SOCKET_SERVER = "http://localhost:5000";

function VideoChatPage() {
  const { roomId } = useParams();
  const [stream, setStream] = useState();
  const myVideo = useRef();
  const peerVideo = useRef();
  const socketRef = useRef();
  const peerRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;

        socketRef.current.emit("join-room", roomId);

        socketRef.current.on("user-joined", () => {
          peerRef.current = new Peer({
            initiator: true,
            trickle: false,
            stream: currentStream,
          });

          peerRef.current.on("signal", (signal) => {
            socketRef.current.emit("signal", { room: roomId, signal });
          });

          peerRef.current.on("stream", (remoteStream) => {
            peerVideo.current.srcObject = remoteStream;
          });

          socketRef.current.on("signal", ({ signal }) => {
            peerRef.current.signal(signal);
          });
        });

        socketRef.current.on("signal", ({ signal }) => {
          if (!peerRef.current) {
            peerRef.current = new Peer({
              initiator: false,
              trickle: false,
              stream: currentStream,
            });

            peerRef.current.on("signal", (signal) => {
              socketRef.current.emit("signal", { room: roomId, signal });
            });

            peerRef.current.on("stream", (remoteStream) => {
              peerVideo.current.srcObject = remoteStream;
            });

            peerRef.current.signal(signal);
          } else {
            peerRef.current.signal(signal);
          }
        });
      });
    return () => {
      socketRef.current.disconnect();
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [roomId]);

  return (
    <div>
      <h2>Video Chat - Room {roomId}</h2>
      <video ref={myVideo} autoPlay muted width={300} />
      <video ref={peerVideo} autoPlay width={300} />
    </div>
  );
}
export default VideoChatPage;