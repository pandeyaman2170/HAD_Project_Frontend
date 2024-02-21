import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const DoctorVideocall = (props) => {
    const roomId = props.value.toString()
    const dr = JSON.parse(localStorage.getItem("doctorDetails"))
    const drName = dr.firstName

    const myMeeting = async (element) => {
        const appID = 626528421;       //tele-health
        const serverSecret = "c2c7fce47f9e72f2f039bdc026c4bfdc";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(), //userId
            drName  
        )

        const zp = ZegoUIKitPrebuilt.create(kitToken)

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomId,
                },
            ],
            showPreJoinView: false,
            showScreenSharingButton: false,
            maxUsers: 2,
            showUserList: false,
            layout: "Auto",
            showLayoutButton: true,
            showRoomDetailsButton: false,
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: false,
            whiteboardConfig: {
                showAddImageButton: true // It's set to false by default. To use this feature, activate the File Sharing feature, and then import the plugin. Otherwise, this prompt will occur: "Failed to add image, this feature is not supported."
                // showCreateAndCloseButton?: boolean; // Whether to display the button that is used to create/turn off the whiteboard. Displayed by default.
            }
        })
    }

    return (
        <div className='bg-blue-50'>
            <div ref={myMeeting} />
        </div>
    )
}

export default DoctorVideocall