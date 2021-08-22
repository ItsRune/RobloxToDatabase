const Colors = require('colors');

function format(msg) {
  let split = String(msg).split(" ");
  let first = split[0];
  let reg = /((\[[a-zA-Z]\])|[a-zA-Z])*:/g

  if (RegExp(reg).test(first)) {
    return split.slice(1).join(" ");
  }
  return split.join(" ");
}

function error(msg, stack) {
  msg = format(msg);

  if (stack) {
    msg = `${msg}\n${stack}`;
  }

  return console.log(`${Colors.red("[Error]:")} ${msg}`);
}

function debuglog(msg) {
  msg = format(msg);
  return console.log(`${Colors.green("[Debug]:")} ${msg}`)
}

function warning(msg) {
  msg = format(msg);
  return console.log(`${Colors.yellow("[Warning]:")} ${msg}`);
}

function log(msg) {
  msg = format(msg);
  return console.log(`${Colors.bold("[Log]:")} ${msg}`);
}

module.exports = {
  log,
  error,
  debuglog,
  warning
}