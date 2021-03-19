// import React from "react";

// const AudioVisualizer = () => {
//   let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//   let analyser = audioCtx.createAnalyser();

//   var canvasCtx = canvas.getContext("2d");
//   var canvas = document.querySelector(".visualizer");

//   //   source = audioCtx.createMediaStreamSource(stream);
//   //   source.connect(analyser);
//   //   analyser.connect(distortion);
//   //   distortion.connect(audioCtx.destination);

//   analyser.getByteTimeDomainData(dataArray);

//   analyser.fftSize = 256;
//   var bufferLength = analyser.frequencyBinCount;
//   console.log(bufferLength);
//   var dataArray = new Uint8Array(bufferLength);

//   canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
//   var bufferLength = analyser.fftSize;

//   function draw() {
//     let drawVisual = requestAnimationFrame(draw);
//     var barHeight;
//     var barWidth = (WIDTH / bufferLengthAlt) * 2.5;

//     analyser.getByteFrequencyData(dataArray);

//     canvasCtx.fillStyle = "rgb(0, 0, 0)";
//     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//     for (var i = 0; i < bufferLength; i++) {
//       let barHeight = dataArray[i] / 2;

//       canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
//       canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

//       x += barWidth + 1;
//     }
//   }

//   draw();

//   return <div></div>;
// };

// export default AudioVisualizer;
