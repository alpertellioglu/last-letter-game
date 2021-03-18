import { React, useState } from "react";
import Rules from "./components/Rules";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Game from "./components/Game";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "80vh",
    marginTop: "5%",
    width: "60vw",
    margin: "auto",
  },
  rules: {
    textAlign: "center",
    marginTop: "2%",
  },
  start: {
    marginTop: "5%",
    textAlign: "center",
  },
}));

const MainContainer = () => {
  const classes = useStyles();
  const [isStarted, setIsStarted] = useState(false);
  return (
    <>
      <div className={classes.container}>
        <Header />
        <div className={classes.start}>
          {!isStarted ? (
            <div>
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
              <div className={classes.rules}>
                <Rules />
              </div>
            </div>
          ) : (
            <Game />
          )}
        </div>
      </div>
    </>
  );
};

export default MainContainer;