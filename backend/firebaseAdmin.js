const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('./taskify-44cef-firebase-adminsdk-folz4-4066296757.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

module.exports = { messaging };
