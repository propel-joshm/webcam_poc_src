import React, {useState, useRef} from 'react';
import { MediaTrackConstraintsOES } from './interfaces/MediaStreamTrackSetOES';

function Two(props:any) {

    const outputText = document.getElementById("outputText")!;
    const outputConstraintError = document.getElementById("outputConstraintError");
    const outputFlipState = document.getElementById("outputFlipState");

    let streamRef: MediaStream;

    const constraints = {
        video: {
            facingMode: { exact: 'environment' },
        }
    }

    function applyTorch(stream:MediaStream) {
        let track = stream.getVideoTracks()[0];
        
        try {
            track.applyConstraints({torch: true} as MediaTrackConstraintsOES);
            outputText.textContent = outputText.innerText.concat("First Success");
        } catch {
            outputText.textContent = outputText.innerText.concat("First Failed");
        }

        try {
            track.applyConstraints({advanced: [{torch: true}]} as MediaTrackConstraintsOES);
            outputText.textContent = outputText.innerText.concat("Second Success");
        } catch(err) {
            outputText.textContent = outputText.innerText.concat("Second Failed");
        }
        
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => { streamRef = stream})




    return (
        <div>
        <button onClick={() => { (streamRef) ? applyTorch(streamRef) : console.log("Stream not found")}}>Click Me</button>
        <div>Flash toggled on</div>
        </div>
    )
}

export default Two;