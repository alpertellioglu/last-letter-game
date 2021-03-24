import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    width: "100%",
    border: "2px solid grey",
    borderRadius: "20px",
    margin: "auto",
    spacing: 0,
    justifyContent: "space-between",
    maxHeight: "400px",
    overflow: "scroll",
  },
  title: {
    marginTop: "5%",
  },
  userAnswers: {
    textAlign: "right",
  },
  computerAnswers: {
    textAlign: "left",
  },
  usedWords: {
    width: "80%",
    margin: "5% auto",
  },
}));

// const usedWords = [
//   "alper",
//   "remzi",
//   "izel",
//   "leyla",
//   "ahmet",
//   "tarik",
//   "kemal",
//   "lale",
//   "emre",
//   "alper",
//   "remzi",
//   "izel",
//   "leyla",
//   "ahmet",
//   "tarik",
//   "kemal",
//   "lale",
//   "emre",
// ];

//const usedWords = JSON.parse(sessionStorage.getItem("usedWords"));

const Results = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainBox}>
        <div className={classes.title}>
          <Typography variant="h4">
            <Box fontWeight={900}>Game Table</Box>
          </Typography>
          <Typography variant="body1">
            (difficulty was: {props.difficulty})
          </Typography>
        </div>
        <div className={classes.usedWords}>
          {props.usedWords.map((word, index) => (
            <Typography
              key={index}
              variant="h6"
              className={
                index % 2 ? classes.userAnswers : classes.computerAnswers
              }
            >
              {word}
            </Typography>
          ))}
        </div>
      </div>
    </>
  );
};

export default Results;
