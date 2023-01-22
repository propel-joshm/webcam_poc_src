import React, {useEffect, useRef, MutableRefObject} from 'react';
import { MediaTrackConstraintsOES, MediaStreamTrackOES } from './interfaces/MediaStreamTrackSetOES';

function Two() {

	const outputText = document.getElementById("outputText")!;
	const outputConstraintError = document.getElementById("outputConstraintError")!;
	

	const streamRef: MutableRefObject<MediaStream | null> = useRef(null);
	const videoRef = useRef(document.getElementById("webcamVideo") as HTMLVideoElement);

	const torchOne = {torch: true};
	const torchTwo = {advanced: [{torch: true}]};

	

	useEffect(() => {
		setStream();
	}, [videoRef]);

	function setStream() {
		const constraints = {
			video: {
				facingMode: { ideal: "environment" },
			},
		};
		navigator.mediaDevices.getUserMedia(constraints)
			.then((stream) => {
				let video = videoRef.current;
				streamRef.current = stream;
				video.srcObject = stream;
			});
	}

	function applyTorch(
		stream: MutableRefObject<MediaStream | null>,
		torchObj: MediaTrackConstraintsOES,
		trigger: string
	) {
		let track = stream.current?.getVideoTracks()[0];
		console.log(stream.current);
		track?.applyConstraints(torchObj as MediaTrackConstraintsOES).catch((err: OverconstrainedError) => {
			outputConstraintError.textContent = err.constraint;
			console.error(err);
			outputText.textContent = `${trigger} Failed`;
		});
	}

	// function logConstraints(stream: MutableRefObject<MediaStream | null>) {
	// 	let track = stream.current?.getVideoTracks()[0] as MediaStreamTrackOES;
	// 	let caps = {...track?.getConstraints()};
		
	// 	outputText.textContent = `Facing Mode: ${caps.facingMode}, Torch: ${(caps.torch) ? caps.torch : "undefined"}`;
	// }

   

	return (
		<div>
			<div>
				<button onClick={() => { setStream()}}>Rerender Stream</button>
				<button onClick={() => { (streamRef) ? applyTorch(streamRef, torchOne, "Torch V1") : console.log("Stream not found")}}>Torch V1</button>
				<button onClick={() => { (streamRef) ? applyTorch(streamRef, torchTwo, "Torch V2") : console.log("Stream not found")}}>Torch V2</button>
				{/* <button onClick={() => { (streamRef) ? logConstraints(streamRef) : console.log("Stream not found")}}>Log Constraints</button> */}
			</div>
			<video ref={videoRef} id="webcamVideo2" width={480} height={480} autoPlay muted playsInline></video>
			
		</div>
	)
}

export default Two;