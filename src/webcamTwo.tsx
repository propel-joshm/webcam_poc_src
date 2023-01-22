import React, {useState} from 'react';

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
        let track = stream.getTracks();

        let sb = '';

        track.forEach(track => {
            sb = sb.concat(track.toString());
            console.log(sb);
            console.log(track);
        })
        
       outputText.textContent = sb;
    }

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            streamRef = stream;
    })




    return (
        <div>
        <button onClick={() => { (streamRef) ? applyTorch(streamRef) : console.log("Stream not found")}}>Click Me</button>
        <div>Flash toggled on</div>
        </div>
    )
}

export default Two;