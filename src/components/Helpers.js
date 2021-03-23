function handleLetterI(name) {
  return "i" + name.slice(1);
}

function successWithPossibility(percentage) {
  const randomNum = Math.floor(Math.random() * 100);
  if (randomNum < percentage) {
    return true; //say percentage is 10 => returns true with 90% possibility
  } else {
    return false;
  }
}

export { handleLetterI, successWithPossibility };
