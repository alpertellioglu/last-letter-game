import { Button } from "@material-ui/core";
import React from "react";

const SpeechRecognition = () => {
  var SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  var SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  //   var colors = [
  //     "aqua",
  //     "azure",
  //     "beige",
  //     "bisque",
  //     "black",
  //     "blue",
  //     "brown",
  //     "chocolate",
  //     "coral",
  //     "crimson",
  //     "cyan",
  //     "fuchsia",
  //     "ghostwhite",
  //     "gold",
  //     "goldenrod",
  //     "gray",
  //     "green",
  //     "indigo",
  //     "ivory",
  //     "khaki",
  //     "lavender",
  //     "lime",
  //     "linen",
  //     "magenta",
  //     "maroon",
  //     "moccasin",
  //     "navy",
  //     "olive",
  //     "orange",
  //     "orchid",
  //     "peru",
  //     "pink",
  //     "plum",
  //     "purple",
  //     "red",
  //     "salmon",
  //     "sienna",
  //     "silver",
  //     "snow",
  //     "tan",
  //     "teal",
  //     "thistle",
  //     "tomato",
  //     "turquoise",
  //     "violet",
  //     "white",
  //     "yellow",
  //   ];
  //   var grammar =
  //     "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";

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
    console.log("Ready to receive a color command.");
  };

  recognition.onresult = function (event) {
    console.log(event.results[0][0].transcript);
    console.log("Confidencea: " + event.results[0][0].confidence);
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
