import { Button, Typography } from "@material-ui/core";
import { React, useState } from "react";
import { ReactMic } from "react-mic";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  micBars: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    opacity: 0.01,
  },
}));

const SpeechRecognition = (props) => {
  const classes = useStyles();
  const [listening, setListening] = useState(false);
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  let SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  let recognition = new SpeechRecognition();
  let speechRecognitionList = new SpeechGrammarList();
  //   speechRecognitionList.addFromString(grammar, 1);
  //   recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "tr";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const handleClick = () => {
    recognition.start();
    setListening(true);
    //console.log("Ready to receive a name command.");
  };

  recognition.onresult = function (event) {
    const answer = event.results[0][0].transcript;
    console.log("Confidence: " + event.results[0][0].confidence);
    props.onUserAnswer(answer);
  };

  recognition.onspeechend = function () {
    setListening(false);
    console.log("recogniton should stop");
    recognition.stop();
  };
  recognition.onnomatch = function (event) {
    console.log("I didn't recognise that name.");
  };
  recognition.onerror = function (event) {
    console.log("Error occurred in recognition: " + event.error);
  };

  // const stopRecording = () => {
  //   setListening(false);
  // };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClick}
      >
        Press to speak
      </Button>
      <div>
        <ReactMic
          record={listening}
          className={classes.micBars}
          visualSetting="frequencyBars"
          strokeColor="#000"
          backgroundColor="#fff"
        />
      </div>
    </>
  );
};

export default SpeechRecognition;
