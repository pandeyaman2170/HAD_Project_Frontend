import React, { useRef, useEffect } from 'react';

const VideoCall = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const localStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);

    useEffect(() => {
        async function startVideoCall() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;
                localStreamRef.current = stream;

                // Create peer connection
                peerConnectionRef.current = new RTCPeerConnection();
                peerConnectionRef.current.addEventListener('track', handleRemoteStream);

                // Add local stream to peer connection
                stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));
            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        }

        startVideoCall();

        return () => {
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleRemoteStream = (event) => {
        const stream = event.streams[0];
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Video Call</h2>
            <div className="flex flex-col items-center justify-center">
                {/* Increase the width and height of the video elements */}
                <video ref={localVideoRef} autoPlay playsInline muted className="w-200 h-200 mb-4"></video>
                <video ref={remoteVideoRef} autoPlay playsInline className="w-200 h-200"></video>
            </div>
        </div>
    );
}

export default VideoCall;

