var firebase = require('firebase/app');
var {firebaseConfig} = require('./firebase_config');
require('firebase/database');
firebase.initializeApp(firebaseConfig);

module.exports.firebase = firebase;