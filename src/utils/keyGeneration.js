const options = {
  keyLength: 6,
  numbersOnly: true // will add letters later, it's late.
};

function keyGenerator() {
  let key = "";
  for (let i = 0; i < options.keyLength; i++) {
    if (options.numbersOnly) {
      key += String(Math.floor(Math.random() * 9));
    }
  }
  return Number(key);
}

module.exports = keyGenerator;