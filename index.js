//-- Packages --\\
const Express = require('express');
const Mongoose = require('./src/mongoose/index');
const { Initializer } = require('./src/discord/index');
const { debuglog } = require('./src/utils/colors');

//-- Variables --\\
const App = Express();

//-- Express --\\
// Middleware \\
App.use(Express.json());
App.use('/api', require('./src/protection/verifyRequest'));

// Routes \\
App.use('/api', require('./src/routes/Api'));

// Initializers \\
App.listen(process.env.PORT || 3000, () => debuglog(`Server online.`));
Initializer();