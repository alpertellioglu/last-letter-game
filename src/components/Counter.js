import { React, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";

const Counter = (props) => {
  const [counter, setCounter] = useState(3);

  useEffect(
    (useEffectProps) => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        props.timeEnds();
        setCounter(3);
        console.log("i am working");
      }
    },
    [counter]
  );

  return (
    <div>
      <Typography variant="h2">{counter}</Typography>
    </div>
  );
};

export default Counter;
