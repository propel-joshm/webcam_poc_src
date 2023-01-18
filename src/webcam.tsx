/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { MediaTrackConstraintsOES } from './interfaces/MediaStreamTrackSetOES';
import './App.css';

function WebcamVideo(props: any) {
    const [torchState, setTorchState] = useState(false);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [photoTaken, setPhotoTaken] = useState(false);

    const webcamVideo = document.getElementById("webcamVideo") as HTMLVideoElement;
    const webcamPicture = document.getElementById("webcamPicture") as HTMLCanvasElement;

    const toggleTorchState = () => setTorchState(!torchState);
    const resetPicture = () => setPhotoTaken(false);
    const takePicture = () => {
        setPhotoTaken(true);

        webcamPicture.width = props.width;
        webcamPicture.height = props.height;

        let canvasContext = webcamPicture.getContext('2d');
        if (canvasContext != null) canvasContext.drawImage(webcamVideo, 0, 0, props.width, props.height)
    };
    const constraints = {
        height: props.height,
        width: props.width,
        video: {
            facingMode: ['user', 'environment'],
            deviceId: '' as ConstrainDOMString
        } as MediaTrackConstraints
    };

    useEffect(() => {

        let hasCamera = !!(window.navigator.mediaDevices.getUserMedia);
        setCameraEnabled(hasCamera);
        
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const cameras = devices.filter((device) => device.kind === "videoinput");
            const camera = cameras[cameras.length - 1];
            constraints.video.deviceId = camera.deviceId;

            navigator.mediaDevices.getUserMedia(constraints)
              .then((stream) => {
                webcamVideo.srcObject = stream;
                let videoTrack = stream.getVideoTracks()[0];
        
                videoTrack.applyConstraints({
                    advanced: [{
                        torch: torchState,
                      } as MediaTrackConstraintsOES,
                    ],
                  }).catch((err) => {
                    console.log(err);
                  });
            })
            .catch((err) => {
                console.log(err);
            });
        });
    }, [webcamVideo, torchState, photoTaken])

    return (
       
        <div>
            <video id="webcamVideo" height={props.height} style={{ display: (!photoTaken && cameraEnabled) ? "block" : "none" }} width={props.width} autoPlay muted playsInline ></video>
            <canvas id="webcamPicture" style={{ display: (photoTaken && cameraEnabled) ? "block" : "none" }} width={props.width} height={props.height}></canvas>
            <button type="button" id="toggleTorch" onClick={toggleTorchState}>Toggle Flash</button>
            <button type="button" onClick={takePicture}>Take Photo</button>
            <button type="button" onClick={resetPicture}>Reset Photo</button>
            <div></div>
        </div>
    )
};

export default WebcamVideo;