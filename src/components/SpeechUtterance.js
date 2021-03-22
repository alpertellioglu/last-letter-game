function speech(phrase) {
  let synth = window.speechSynthesis;

  const utterThis = new SpeechSynthesisUtterance(phrase);

  synth.speak(utterThis);
}

export { speech };
