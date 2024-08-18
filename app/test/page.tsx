"use client";

import { Button } from "@/components/ui/button";
import { socket } from "@/socket";
import { PhoneIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import CopyToClipboard from "./_components/copy-to-clipboard";

const TestPage = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callAccepted", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
  };
  return (
    <div>
      <h1 className="text-center text-black">Calling Test</h1>
      <div className="grid grid-cols-[7fr_3fr]">
        <div className="grid grid-cols-[1fr_1fr] justify-center items-center mt-40 ml-40">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="w-[300px]"
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded && (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                className="w-[300px]"
              />
            )}
          </div>
        </div>

        <div className="myId">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              id="filled-basic"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-5"
            />
          </div>

          <CopyToClipboard text={me} buttonText="Copy ID" />

          <div className="flex flex-col gap-2">
            <label>ID To Call</label>
            <input
              id="filled-basic"
              value={idToCall}
              onChange={(e) => setIdToCall(e.target.value)}
              className="mb-5"
            />
          </div>

          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="secondary" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <Button
                color="primary"
                aria-label="call"
                onClick={() => callUser(idToCall)}
              >
                <PhoneIcon fontSize="large" />
              </Button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted && (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="secondary" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
