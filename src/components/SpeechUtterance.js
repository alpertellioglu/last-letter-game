function speech(phrase, lang) {
  let synth = window.speechSynthesis;

  const utterThis = new SpeechSynthesisUtterance(phrase);

  utterThis.lang = lang;

  synth.speak(utterThis);
}

export { speech };
