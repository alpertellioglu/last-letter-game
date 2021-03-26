import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";
import names from "../data/names.json";
import Counter from "./Counter";
import SpeechRecognition from "../components/SpeechRecognition";
import CircularProgress from "@material-ui/core/CircularProgress";
import Results from "./Results";
import { speech } from "./SpeechUtterance";
import { handleLetterI, successWithPossibility } from "./Helpers";
import Confetti from "react-confetti";

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
    marginTop: "2%",
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
  const [whoWon, setWhoWon] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [randomName, setRandomName] = useState(
    names[Math.floor(Math.random() * names.length)]
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      let usedWords = JSON.parse(sessionStorage.getItem("usedWords"));
      speech(randomName);
      usedWords.push(randomName);
      sessionStorage.setItem("usedWords", JSON.stringify(usedWords));
    }
    return () => (mounted = false);
  }, [randomName]);

  const checkUserAnswer = (answer) => {
    if (isGameEnd) {
      return;
    }
    setUserAnswer(answer);

    if (answer.charAt(0) === "İ") {
      answer = handleLetterI(answer);
    }

    answer = answer.toLowerCase();
    console.log("User answer is: " + answer);

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
      userLost();
      //setIsGameEnd(true);
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

  const play = (withUserAnswer) => {
    if (successWithPossibility(props.difficulty)) {
      const lastLetter = getLastLetter(withUserAnswer);
      findNewName(lastLetter);
    } else {
      console.log("computer can not find an answer");
      setTimeout(function () {
        setWhoWon("user");
        stopTheGame();
      }, 5000);
    }
  };

  const getLastLetter = (word) => {
    const lastLetter = word.slice(-1);
    return lastLetter;
  };

  const findNewName = (withLastLetter) => {
    const availableNames = names.filter(
      (name) => name.charAt(0) === withLastLetter
    );

    const newRandomName =
      availableNames[Math.floor(Math.random() * availableNames.length)];

    //dummy thinking for computer
    const randomSeconds = Math.floor(Math.random() * 4) + 1;

    setTimeout(function () {
      setRandomName(newRandomName);
      setIsUserTurn(true);
    }, randomSeconds * 1000);
  };

  const userLost = () => {
    setWhoWon("computer");
    stopTheGame();
  };

  const stopTheGame = () => {
    setIsUserTurn(false);
    setIsGameEnd(true);
  };

  const handleRestart = () => {
    sessionStorage.setItem("usedWords", JSON.stringify([]));
    props.onReset();
    setUserAnswer("");
    setIsGameEnd(false);
    setRandomName(names[Math.floor(Math.random() * names.length)]);
    setIsUserTurn(true);
  };

  const handleMainMenuClicked = () => {
    sessionStorage.setItem("usedWords", JSON.stringify([]));
    props.backToMainMenu();
  };

  return (
    <>
      <div className={classes.mainBox}>
        {!isUserTurn && !isGameEnd && (
          <Typography variant="h2">Your answer was: {userAnswer}</Typography>
        )}

        {isUserTurn && !isGameEnd && (
          <Typography variant="h2">{randomName}</Typography>
        )}

        {!isGameEnd &&
          (isUserTurn ? (
            <Counter timeEnds={userLost} />
          ) : (
            <div style={{ marginTop: "30px" }}>
              <CircularProgress color="primary" />
              <Typography variant="h6">Computer is thinking...</Typography>
            </div>
          ))}

        {isUserTurn && !isGameEnd && (
          <SpeechRecognition onUserAnswer={checkUserAnswer} />
        )}

        {isGameEnd && (
          <div className={classes.resultsContainer}>
            <div className={classes.flexLeft}>
              {whoWon === "computer" ? (
                <Typography variant="h3">You Lost</Typography>
              ) : (
                <div>
                  <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                  />
                  <Typography variant="h3">You Won</Typography>
                </div>
              )}
              <div>
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
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleMainMenuClicked}
                  style={{ marginTop: "50px" }}
                >
                  Main Menu
                </Button>
              </div>
            </div>

            <div className={classes.flexRight}>
              <Results
                usedWords={JSON.parse(sessionStorage.getItem("usedWords"))}
                difficulty={props.difficulty}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
