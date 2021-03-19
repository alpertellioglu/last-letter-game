import { Button, Typography } from "@material-ui/core";
import { React, useState } from "react";

const SpeechRecognition = (props) => {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  //   speechRecognitionList.addFromString(grammar, 1);
  //   recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "tr";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const handleClick = () => {
    recognition.start();
    //console.log("Ready to receive a name command.");
  };

  recognition.onresult = function (event) {
    //console.log(event.results[0][0].transcript);
    const answer = event.results[0][0].transcript;
    //console.log(answer);
    console.log("Confidence: " + event.results[0][0].confidence);
    props.onUserAnswer(answer);
  };

  recognition.onspeechend = function () {
    recognition.stop();
  };
  recognition.onnomatch = function (event) {
    console.log("I didn't recognise that name.");
  };
  recognition.onerror = function (event) {
    console.log("Error occurred in recognition: " + event.error);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClick}
      >
        Start speaking
      </Button>
    </>
  );
};

export default SpeechRecognition;
