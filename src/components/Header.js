import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    //backgroundColor: "red",
    // height: "20%",
    width: "80%",
    border: "2px solid grey",
    borderRadius: "20px",
    margin: "auto",
    spacing: 0,
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    margin: "2% 5%",
  },
  scoreTable: {
    backgroundColor: "#FFF",
    textAlign: "center",
    borderRadius: "20px",
    width: "25%",
    margin: "2% 5%",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainBox}>
        <div className={classes.title}>
          <Typography variant="h4">
            <Box fontWeight={900}>Last</Box>
            <Box fontWeight={900}>Letter</Box>
            <Box fontWeight={900}>Game</Box>
          </Typography>
        </div>

        <div className={classes.scoreTable}>
          <Typography variant="h6" color="secondary">
            Score
          </Typography>
          <Typography variant="h2" color="secondary">
            0
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Header;
