import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import names from "../data/names.json";
import Counter from "./Counter";
import SpeechRecognition from "../components/SpeechRecognition";
import CircularProgress from "@material-ui/core/CircularProgress";
//import AudioVisualizer from "./AudioVisualizer";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "30px",
  },
}));

const Game = () => {
  const classes = useStyles();
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const [randomName, setRandomName] = useState(
    names[Math.floor(Math.random() * names.length)]
  );

  const checkUserAnswer = (answer) => {
    setUserAnswer(answer);

    console.log("User answer is: " + answer);
    answer = answer.toLowerCase();

    const lastLetterOfComputerAnswer = getLastLetter(randomName);
    const possibleCorrectAnswers = names.filter(
      (name) => name.charAt(0) === lastLetterOfComputerAnswer
    );

    console.log(possibleCorrectAnswers);

    if (possibleCorrectAnswers.includes(answer)) {
      console.log("user answer is true");

      setIsUserTurn(false);

      play(answer);
    } else {
      console.log("user answer is not correct");
      setIsGameEnd(true);
    }
  };

  const randomThinkingTime = () => {
    const randomSeconds = Math.floor(Math.random() * 4) + 1; //returns a random int between 1-5
    setTimeout(function () {
      setIsUserTurn(true);
      setUserAnswer("");
    }, randomSeconds * 1000);
  };

  const play = (withUserAnswer) => {
    const lastLetter = getLastLetter(withUserAnswer);
    findNewName(lastLetter);
  };

  const getLastLetter = (word) => {
    const lastLetter = word.slice(-1);
    return lastLetter;
  };

  const findNewName = (withLastLetter) => {
    randomThinkingTime(); //dummy thinking for computer
    const availableNames = names.filter(
      (name) => name.charAt(0) === withLastLetter
    );

    setRandomName(
      availableNames[Math.floor(Math.random() * availableNames.length)]
    );
  };

  const stopTheGame = () => {
    setIsUserTurn(false);
    setIsGameEnd(true);
  };

  return (
    <>
      <div className={classes.mainBox}>
        {isUserTurn && <SpeechRecognition onUserAnswer={checkUserAnswer} />}

        {userAnswer && (
          <Typography variant="h2">Your answer was: {userAnswer}</Typography>
        )}

        {isUserTurn && !isGameEnd && (
          <Typography variant="h2">{randomName}</Typography>
        )}
        {isGameEnd && <Typography variant="h2">Game Ends</Typography>}
        {!isGameEnd &&
          (isUserTurn ? (
            <Counter timeEnds={stopTheGame} />
          ) : (
            <div>
              <CircularProgress color="primary" />
              <Typography variant="h6">Computer is thinking...</Typography>
            </div>
          ))}
      </div>
    </>
  );
};

export default Game;
