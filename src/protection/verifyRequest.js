module.exports = (req, res, next) => {
  const agent = req.headers['user-agent'].toLowerCase();

  if (agent.match("roblox") || agent.match("postman")) {
    next();
  } else {
    res.status(403).json({Success:false, error:"Forbidden"});
  }
}