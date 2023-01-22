import React, {useEffect, useRef, MutableRefObject} from 'react';
import { MediaTrackConstraintsOES, MediaStreamTrackOES } from './interfaces/MediaStreamTrackSetOES';

function Two() {

	const outputText = document.getElementById("outputText")!;
	const outputConstraintError = document.getElementById("outputConstraintError")!;

	const streamRef: MutableRefObject<MediaStream | null> = useRef(null);

	const torchOne = {torch: true};
	const torchTwo = {advanced: [{torch: true}]};

	useEffect(() => {
		setStream();
	}, [streamRef]);

	function setStream() {

		const constraints = {
			video: {
				facingMode: { ideal: "environment" },
			},
		};
		
		console.log(navigator.mediaDevices.getSupportedConstraints());

		navigator.mediaDevices.getUserMedia(constraints)
			.then((stream) => {
				streamRef.current = stream;
				console.log(stream);
			});
	}

	function applyTorch(
		stream: MutableRefObject<MediaStream | null>,
		torchObj: MediaTrackConstraintsOES,
		trigger: string
	) {
		let track = stream.current?.getVideoTracks()[0];
	
		console.log(track);
		console.log(torchObj);
	
		track?.applyConstraints(torchObj).catch((err) => {
			if (err instanceof OverconstrainedError) {
				outputConstraintError.textContent = err.constraint;
			}
			outputText.textContent = `${trigger} Failed`;
		});
	}

	function logConstraints(stream: MutableRefObject<MediaStream | null>) {
		let track = stream.current?.getVideoTracks()[0] as MediaStreamTrackOES;
		let caps = {...track?.getConstraints()};
		
		outputText.textContent = `Facing Mode: ${caps.facingMode}, Torch: ${(caps.torch) ? caps.torch : "undefined"}`;
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