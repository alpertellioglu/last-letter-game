function speech(phrase) {
  let synth = window.speechSynthesis;

  const utterThis = new SpeechSynthesisUtterance(phrase);

  utterThis.lang = "tr";

  synth.speak(utterThis);
}

export { speech };
