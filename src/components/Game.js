import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import names from "../data/names.json";
import Counter from "./Counter";
import SpeechRecognition from "../components/SpeechRecognition";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({}));

const Game = () => {
  const classes = useStyles();
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const [randomName, setRandomName] = useState(
    names[Math.floor(Math.random() * names.length)]
  );

  const checkUserAnswer = (answer) => {
    console.log("User answer is:" + answer);
    answer = answer.toLowerCase();
    if (names.includes(answer)) {
      console.log("user answer is true");
      setIsUserTurn(false);

      play();
    } else {
      console.log("user answer is not a name");
      setIsGameEnd(true);
    }
  };

  const randomThinkingTime = () => {
    const randomSeconds = Math.floor(Math.random() * 4) + 1; //returns a random int between 1-5
    setTimeout(function () {
      setIsUserTurn(true);
    }, randomSeconds * 1000);
  };

  const findNewName = () => {
    randomThinkingTime(); //dummy thinking for computer
    setRandomName(names[Math.floor(Math.random() * names.length)]);
  };

  const play = () => {
    findNewName();
  };

  const stopTheGame = () => {
    //setIsUserTurn(false);
    setIsGameEnd(true);
  };

  return (
    <>
      <div>
        {isUserTurn && <Typography variant="h2">{randomName}</Typography>}
        {isGameEnd && <Typography variant="h2">Game Ends</Typography>}
        {!isGameEnd &&
          (isUserTurn ? (
            <Counter timeEnds={stopTheGame} />
          ) : (
            <CircularProgress color="primary" />
          ))}
      </div>

      <SpeechRecognition onUserAnswer={checkUserAnswer} />
    </>
  );
};

export default Game;
