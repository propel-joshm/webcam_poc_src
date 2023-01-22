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

    const torchOne = {torch: true};
    const torchTwo = {advanced: [{torch: true}]};

    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => { 
        streamRef = stream
        console.log(stream);
    })

    function applyTorch(stream:MediaStream, torchObj: MediaTrackConstraintsOES, trigger: string) {
        let track = stream.getVideoTracks()[0];
        console.log(track);
        console.log(torchObj)

        track.applyConstraints(torchObj)
            .catch(err => {
                if (err instanceof OverconstrainedError){
                    outputConstraintError.textContent = err.constraint;
                } 
                outputText.textContent = `${trigger} Failed`;
            });
            
    }

    function logConstraints(stream: MediaStream) {
        let track = stream.getVideoTracks()[0];
        console.log(`Settings:`, track.getSettings());
        console.log(`Constraints:`, track.getConstraints());
        console.log(`Capabilities:`, track.getCapabilities());
    }

   

    return (
        <div>
            <div>
                <button onClick={() => { (streamRef) ? applyTorch(streamRef, torchOne, "Torch V1") : console.log("Stream not found")}}>Torch V1</button>
                <button onClick={() => { (streamRef) ? applyTorch(streamRef, torchTwo, "Torch V2") : console.log("Stream not found")}}>Torch V2</button>
            </div>
            <button onClick={() => { (streamRef) ? logConstraints(streamRef) : console.log("Stream not found")}}>Log Constraints</button>
        </div>
    )
}

export default Two;