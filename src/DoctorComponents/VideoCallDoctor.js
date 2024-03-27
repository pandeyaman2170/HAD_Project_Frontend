import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const VideoCallDoctor = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCaller, setIsCaller] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false); // Track mic mute state
  const [isVideoMuted, setIsVideoMuted] = useState(false); // Track video mute state

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
     // Function to handle microphone mute/unmute
     const handleMicMute = async () => {
      if (localStream) {
        const audioTracks = localStream.getAudioTracks();
        if (audioTracks.length > 0) {
          audioTracks[0].enabled = !isMicMuted;
          setIsMicMuted(!isMicMuted); // Update state for button toggle
        }
      } else {
        console.warn('No local stream available for microphone mute/unmute');
      }
    };

    // Function to handle camera on/off
    const handleVideoMute = async () => {
      if (localStream) {
        const videoTracks = localStream.getVideoTracks();
        if (videoTracks.length > 0) {
          videoTracks[0].enabled = !isVideoMuted;
          setIsVideoMuted(!isVideoMuted); // Update state for button toggle
        }
      } else {
        console.warn('No local stream available for camera on/off');
      }
    };
  useEffect(() => {

    let pc;

    const initializePeerConnection = async () => {


      const stream = await playVideoFromCamera();
      setLocalStream(stream);

      if (firebase.apps.length === 0) {
        const firebaseConfig = {
          apiKey: "AIzaSyAKNfKu9cb6TSSGOZ1d4TwNCVUdJn6hmak",
          authDomain: "webdemo-e52ea.firebaseapp.com",
          projectId: "webdemo-e52ea",
          storageBucket: "webdemo-e52ea.appspot.com",
          messagingSenderId: "747216449715",
          appId: "1:747216449715:web:89a406e9c2ee2af0a740c6",
          measurementId: "G-3HKGTKV8XZ",
          databaseURL: "https://webdemo-e52ea-default-rtdb.asia-southeast1.firebasedatabase.app/",
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
  const handleEndCall = () => {
    // Close peer connection and stop local and remote streams
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
    }

    // Set signaling value to null in Firebase Realtime Database
    firebase.database().ref('signalling').set(null);

    // Redirect to '/patient' page
    window.location.href = '/doctor';
  };


  return (
    <div>
      {/* Display local video stream */}
      <video id="localStream" autoPlay playsInline controls={false}/>
      {/* Display remote video stream */}
      <video id="remoteStream" autoPlay playsInline controls={false}/>
      {/* Button to initiate call */}
      <div className='call-control-buttons'>
        <button onClick={handleCallButton} className='make-call'>Call</button>
      </div>
      <div className="call-control-buttons">
        <button className="call-control-button mic-mute" onClick={handleMicMute}>
          <i className={`fas fa-microphone ${isMicMuted ? 'muted' : ''}`}></i>
        </button>
        <button className="call-control-button video-mute" onClick={handleVideoMute}>
          <i className={`fas fa-video ${isVideoMuted ? 'muted' : ''}`}></i>
        </button>
        <button className="call-control-button end-call" onClick={handleEndCall}>
          <i className="fas fa-phone-slash"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoCallDoctor;