const { app, dev, functions } = require("./setup");

// app routes
require("./Routes/Projects/Card");

// // dev routes
require("./DevRoutes/Projects/Card");

// Export the main app
exports.app = functions.https.onRequest(app);

// Export the dev version
exports.dev = functions.https.onRequest(dev);
