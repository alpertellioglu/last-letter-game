import { ReactMic } from "react-mic";
import { React, useState } from "react";

export default function AudioVisualizer() {
  const [record, setRecord] = useState(false);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  function onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  function onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);
  }

  return (
    <div>
      <ReactMic
        record={record}
        className="sound-wave"
        visualSetting="frequencyBars"
        onStop={onStop}
        onData={onData}
        strokeColor="#000"
        backgroundColor="#fff"
      />
      <button onClick={startRecording} type="button">
        Start
      </button>
      <button onClick={stopRecording} type="button">
        Stop
      </button>
    </div>
  );
}
