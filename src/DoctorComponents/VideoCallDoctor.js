import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const VideoCallDoctor = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCaller, setIsCaller] = useState(false);
  let count = 0;

  const constraints = {
    'video': true,
    'audio': true
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        // console.log('Got MediaStream:', stream);
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

  async function playVideoFromCamera() {
    try {
      const constraints = {'video': true, 'audio': true};
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.querySelector('video#localStream');
      videoElement.srcObject = stream;
      return stream;
    } catch(error) {
      console.error('Error opening video camera.', error);
      throw error;
    }
  }

  useEffect(() => {

    let pc;

    const initializePeerConnection = async () => {


      const stream = await playVideoFromCamera();
      setLocalStream(stream);

      if (firebase.apps.length === 0) {
        const firebaseConfig = {
          apiKey: "AIzaSyBbS8-RXtxdDTfPMUOFusZAsRO4nIUXPO8",
          authDomain: "signalling-server-c301e.firebaseapp.com",
          projectId: "signalling-server-c301e",
          storageBucket: "signalling-server-c301e.appspot.com",
          messagingSenderId: "687152087527",
          appId: "1:687152087527:web:972096d59a032d12757d42",
          measurementId: "G-H4WESFH17W",
          databaseURL: "https://signalling-server-c301e-default-rtdb.asia-southeast1.firebasedatabase.app",
        };
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
    }

      // Set up signaling channel with Firebase
      const database = firebase.database();
      const signalingChannel = database.ref('signalling');

      if(stream) {

        // Create peer connection
        pc = new RTCPeerConnection({
          iceServers: [{
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
        }]
        });
        
        pc.addEventListener('icecandidate', event => {
          if (event.candidate) {
            const candidate = JSON.stringify(event.candidate);
            signalingChannel.push({ iceCandidate: candidate });
          }
        });
        pc.addEventListener('connectionstatechange', event => {
          if (pc.connectionState === 'connected') {
            console.log("Connected");
          }
        });

        
        stream.getTracks().forEach(track => {
          pc.addTrack(track, stream);
        });

        const remoteVideo = document.querySelector('video#remoteStream');
        pc.addEventListener('track', async (event) => {
            const [remoteStream] = event.streams;
            remoteVideo.srcObject = remoteStream;
        });
        // pc.addEventListener('track', event => {
        //   const remoteStream = event.streams[0];
        //   event.streams.forEach(track => {
        //     remoteStream.addTrack(track);
        //   });
        //   setRemoteStream(remoteStream);
        // });
        // stream.getTracks().forEach(track => pc.addTrack(track, stream));

        setPeerConnection(pc);

        return signalingChannel;
      }
      else{
        console.log("Problem with stream");
      }
    };

    initializePeerConnection().then((signalingChannel) => {
      signalingChannel.on('child_added', async snapshot => {
        let message = snapshot.val();
        if (message.recipient === "callee" && !isCaller && message.offer) {
          count++;
          if(count === 2) return;
          let offer = JSON.parse(message.offer);
          await handleOffer(offer);
        } else if (message.recipient === "caller" && isCaller && message.answer) {
          let answer = JSON.parse(message.answer);
          await handleAnswer(answer);
        } else if (message.iceCandidate) {
          let answer = JSON.parse(message.iceCandidate);
          await handleIceCandidate(answer);
        }
      });
    });
    
    async function handleOffer(offer) {
      console.log("Handle Offer");
      console.log(pc);
      if(pc) {
        pc.setRemoteDescription(new RTCSessionDescription(offer))
        .then(async function () {
          let answerCallee = await pc.createAnswer();
          await pc.setLocalDescription(answerCallee);
          answerCallee = JSON.stringify(answerCallee);
          const answerMessage = {
            answer : answerCallee,
            recipient: "caller"
          }
          firebase.database().ref('signalling').push(answerMessage);
        })
        .then((data) => {
        })
        .catch((error) => {
          console.error('Error pushing data to Firebase:', error);
        });
      }
      else {
        console.log("Peer connection not initialized");
      }
    }

    async function handleAnswer(answer) {
      console.log("Handle Answer");
      console.log(pc);
      if (pc.signalingState !== 'stable') {
        pc.setRemoteDescription(new RTCSessionDescription(answer)).catch(error => {
          console.error('Error handling answer:', error);
        });
      } else {
        console.log("Connection already in stable state, ignoring answer");
      }
    }

    async function handleIceCandidate(iceCandidate) {
      pc.addIceCandidate(iceCandidate).catch(error => {
        console.error('Error adding ICE candidate:', error);
      });
    }

    async function handleRemoteStream() {
      const remoteStream = new MediaStream();
      pc.getRemoteStreams().forEach(stream => {
        stream.getTracks().forEach(track => {
          remoteStream.addTrack(track);
        });
      });
      const videoElement = document.querySelector('video#remoteStream');
      videoElement.srcObject = remoteStream;
      videoElement.play().catch(error => {
        console.error('Error playing remote stream:', error);
      });
    }

    return () => {
      // Cleanup code if needed
    };
  }, []);

  const handleCallButton = async () => {
    try {
      let offerSender = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offerSender);
      offerSender = JSON.stringify(offerSender);
      const offerMessage = {
        offer: offerSender,
        recipient: "callee"
      };
      firebase.database().ref("signalling").push(offerMessage)
      .then((data) => {
      })
      .catch((error) => {
        console.error('Error pushing data to Firebase:', error);
      });
    } catch (error) {
        console.error('Error initiating call:', error);
    }
  };

  return (
    <div>
      {/* Display local video stream */}
      <video id="localStream" autoPlay playsInline controls={false}/>
      {/* Display remote video stream */}
      <video id="remoteStream" autoPlay playsInline controls={false}/>
      {/* Button to initiate call */}
      <button onClick={handleCallButton}>Call</button>
    </div>
  );
};

export default VideoCallDoctor;