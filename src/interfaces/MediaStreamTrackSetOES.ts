export interface MediaTrackConstraintSetOES extends MediaTrackConstraintSet {
  torch?: ConstrainBoolean;
  };

export interface MediaTrackConstraintsOES extends MediaTrackConstraintSetOES {
    advanced?: MediaTrackConstraintSetOES[]
  };

 export interface MediaStreamTrackOES extends MediaStreamTrack {
    getConstraints():MediaTrackConstraintsOES
  };