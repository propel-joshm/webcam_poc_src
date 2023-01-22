import React, {useState, useRef} from 'react';
import { MediaTrackConstraintsOES } from './interfaces/MediaStreamTrackSetOES';

function Two(props:any) {

    const outputText = document.getElementById("outputText")!;
    const outputConstraintError = document.getElementById("outputConstraintError")!;
    const outputFlipState = document.getElementById("outputFlipState");

    let streamRef: MediaStream;

    const constraints = {
        video: {
            facingMode: { ideal: 'environment' },
        }
    }

    function applyTorchOne(stream:MediaStream) {
        let track = stream.getVideoTracks()[0];
        try {
            track.applyConstraints({torch: true} as MediaTrackConstraintsOES);
        } catch (err) {
            if (err instanceof OverconstrainedError) outputConstraintError.textContent = err.constraint;
            outputText.textContent = outputText.innerText.concat("First Failed");
        }
    }

    function applyTorchTwo(stream:MediaStream) {
        let track = stream.getVideoTracks()[0];
        try {
            track.applyConstraints({advanced: [{torch: true}]} as MediaTrackConstraintsOES);
        } catch(err) {
            if (err instanceof OverconstrainedError) outputConstraintError.textContent = err.constraint;
            outputText.textContent = outputText.innerText.concat("Second Failed");
        }
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => { 
            streamRef = stream
            console.log(stream);
        })

    return (
        <div>
            <button onClick={() => { (streamRef) ? applyTorchOne(streamRef) : console.log("Stream not found")}}>Torch V1</button>
            <button onClick={() => { (streamRef) ? applyTorchTwo(streamRef) : console.log("Stream not found")}}>Torch V2</button>
        </div>
    )
}

export default Two;