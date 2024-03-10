const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/Projects/Card");
require("./Routes/Projects/Overview");
require("./Routes/Timeline");
require("./Routes/Certificates");
require("./Routes/Auth");

require("./Routes/CopyFromDev");


// // dev routes
require("./DevRoutes/Projects/Card");
require("./DevRoutes/Projects/Overview");
require("./DevRoutes/Timeline");
require("./DevRoutes/Certificates");
require("./DevRoutes/Auth");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
