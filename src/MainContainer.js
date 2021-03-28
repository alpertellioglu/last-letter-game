import { React, useState } from "react";
import Rules from "./components/Rules";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Game from "./components/Game";
import { Button, Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "80vh",
    marginTop: "5%",
    width: "60vw",
    margin: "auto",
  },
  menu: {
    marginTop: "5%",
    textAlign: "center",
  },
  menuItem: {
    margin: "50px",
  },
}));

const difficultyMarks = [
  {
    value: 9,
    label: "Easy",
  },

  {
    value: 99,
    label: "Hard",
  },
];

sessionStorage.setItem("usedWords", JSON.stringify([]));

const MainContainer = () => {
  const classes = useStyles();
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(70);

  const increaseScore = () => {
    const newScore = score + 1;
    setScore(newScore);
  };

  const resetScore = () => {
    setScore(0);
  };

  const handleDifficultyChange = (event, newValue) => {
    setDifficulty(newValue);
  };

  const goToMainMenu = () => {
    setScore(0);
    setIsStarted(false);
  };

  return (
    <>
      <div className={classes.container}>
        <Header score={score} />

        <div className={classes.menu}>
          {!isStarted ? (
            <div>
              <div className={classes.menuItem}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => {
                    setIsStarted(true);
                  }}
                >
                  Start the Game
                </Button>
              </div>

              <div className={classes.menuItem}>
                <Typography variant="h5">Difficulty</Typography>

                <Slider
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  style={{ width: "30%" }}
                  min={10}
                  step={1}
                  max={99}
                  valueLabelDisplay="auto"
                  marks={difficultyMarks}
                />
              </div>

              <div className={classes.rules}>
                <Rules />
              </div>
            </div>
          ) : (
            <Game
              onScore={increaseScore}
              onReset={resetScore}
              backToMainMenu={goToMainMenu}
              difficulty={difficulty}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MainContainer;
