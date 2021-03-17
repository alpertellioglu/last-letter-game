import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import names from "../data/names.json";
import Counter from "./Counter";
import SpeechRecognition from "../components/SpeechRecognition";

const useStyles = makeStyles((theme) => ({}));

const Game = () => {
  const classes = useStyles();
  const [isUserTurn, setIsUserTurn] = useState(true);
  const userAnswer = "tutku";

  const [randomName, setRandomName] = useState(
    names[Math.floor(Math.random() * names.length)]
  );

  const checkUserAnswer = () => {
    console.log("time ends");
    if (names.includes(userAnswer)) {
      console.log("user answer is true");
      setIsUserTurn(false);
      play();
    }
  };

  const findNewName = () => {
    setRandomName(names[Math.floor(Math.random() * names.length)]);
  };

  const play = () => {
    findNewName();
    //setIsUserTurn(true);
  };

  return (
    <>
      <div>
        <Typography variant="h2">{randomName}</Typography>
        {isUserTurn && <Counter timeEnds={checkUserAnswer} />}
      </div>

      <SpeechRecognition />
    </>
  );
};

export default Game;
