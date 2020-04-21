'use strict';


let nodeData; // object we will push to firebase
let fbData;   // data we pull from firebase
let fbDataArray;  // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you created in db

function setup() {
  noCanvas();

  let config = {
    apiKey: "AIzaSyCEM2bNRQtaLOLzMNRvgJTz1BImTRb-MPI",
    authDomain: "social-c7c31.firebaseapp.com",
    databaseURL: "https://social-c7c31.firebaseio.com",
    projectId: "social-c7c31",
    storageBucket: "social-c7c31.appspot.com",
    messagingSenderId: "7276354307",
    appId: "1:7276354307:web:002e05daba1c356d9be736"
  };

  firebase.initializeApp(config);
  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotdata, errData);

  // DB url: https://console.firebase.google.com/u/2/project/social-c7c31/database/social-c7c31/data/~2F
}

function draw() {
  background(220);
}
