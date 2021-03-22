import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import names from "../data/names.json";
import Counter from "./Counter";
import SpeechRecognition from "../components/SpeechRecognition";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "./Results";
//import AudioVisualizer from "./AudioVisualizer";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "30px",
  },
  resultsContainer: {
    display: "flex",
    width: "90%",
    margin: "auto",
    justifyContent: "space-between",
  },
  flexLeft: {
    marginTop: "10%",
    width: "30%",
  },
  flexRight: {
    width: "60%",
  },
}));

const Game = (props) => {
  const classes = useStyles();
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [randomName, setRandomName] = useState(
    names[Math.floor(Math.random() * names.length)]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let usedWords = JSON.parse(sessionStorage.getItem("usedWords"));
      usedWords.push(randomName);
      sessionStorage.setItem("usedWords", JSON.stringify(usedWords));
    }
    return () => (mounted = false);
  }, [randomName]);

  const checkUserAnswer = (answer) => {
    setUserAnswer(answer);

    console.log("User answer is: " + answer);
    answer = answer.toLowerCase();

    const lastLetterOfComputerAnswer = getLastLetter(randomName);
    const possibleCorrectAnswers = names.filter(
      (name) => name.charAt(0) === lastLetterOfComputerAnswer
    );

    if (!isAlreadyUsed(answer) && possibleCorrectAnswers.includes(answer)) {
      //user answer is true

      props.onScore();

      let usedWords = JSON.parse(sessionStorage.getItem("usedWords"));
      usedWords.push(answer);
      sessionStorage.setItem("usedWords", JSON.stringify(usedWords));

      setIsUserTurn(false);
      play(answer);
    } else {
      console.log("user answer is not correct");
      setIsGameEnd(true);
    }
  };

  const isAlreadyUsed = (answer) => {
    const alreadyUsedAnswers = JSON.parse(sessionStorage.getItem("usedWords"));
    if (alreadyUsedAnswers.includes(answer)) {
      //console.log("answer is already used");
      return true;
    } else {
      //console.log("answer has not used yet");
      return false;
    }
  };

  const randomThinkingTime = () => {
    const randomSeconds = Math.floor(Math.random() * 4) + 1; //returns a random int between 1-5
    setTimeout(function () {
      setIsUserTurn(true);
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

    const newRandomName =
      availableNames[Math.floor(Math.random() * availableNames.length)];

    setRandomName(newRandomName);
  };

  const stopTheGame = () => {
    setIsUserTurn(false);
    setIsGameEnd(true);
  };

  const handleRestart = () => {};

  return (
    <>
      <div className={classes.mainBox}>
        {isUserTurn && !isGameEnd && (
          <SpeechRecognition onUserAnswer={checkUserAnswer} />
        )}

        {!isUserTurn && !isGameEnd && (
          <Typography variant="h2">Your answer was: {userAnswer}</Typography>
        )}

        {isUserTurn && !isGameEnd && (
          <Typography variant="h2">{randomName}</Typography>
        )}

        {!isGameEnd &&
          (isUserTurn ? (
            <Counter timeEnds={stopTheGame} />
          ) : (
            <div>
              <CircularProgress color="primary" />
              <Typography variant="h6">Computer is thinking...</Typography>
            </div>
          ))}

        {isGameEnd && (
          <div className={classes.resultsContainer}>
            <div className={classes.flexLeft}>
              <Typography variant="h3">You Lost</Typography>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleRestart}
                style={{ marginTop: "50px" }}
              >
                Restart
              </Button>
            </div>

            <div className={classes.flexRight}>
              <Results
                usedWords={JSON.parse(sessionStorage.getItem("usedWords"))}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
