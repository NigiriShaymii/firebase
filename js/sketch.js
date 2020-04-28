'use strict';
// DB url: https://console.firebase.google.com/u/2/project/social-c7c31/database/social-c7c31/data/~2F

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'demo-messages'; // name of folder you created in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv, sendDiv;

function setup() {
  noCanvas();

  //messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");

  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);

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

  ref.on('value', gotData, errData);

}

function draw() {
  background(220);
}

function sendMessage() {

  if (messageInput.value) { // Check if we typed something

    // First, assign timestamp for the messages
    // We will use this both for the message ID and include it in the messages object itself
    // *** this is a little redundant but helps when we update the message values
    let timestamp = Date.now(); // milliseconds since midnight of January 1, 1970 (beginning of time ;)

    // first, create object of messageData
    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp,
    }

    // push to firebase!!!
    createNode(folderName, timestamp, nodeData);

    console.log('send message');
    console.log(nodeData);

    createP(`send message: ${nodeData.messageText}`);

    // zero out text textarea
    messageInput.value = ''

    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';

  } else {

    // If they didn't type anything in the textarea
    alert("Type message First!");
  }
}

function receiveMessage() {

  shuffleArray(fbDataArray);

  for (let i = 0; i < fbDataArray.length; i++) {
    if (fbDataArray[i].received === false) {
      //console.log(`received: ${fbDataArray[i].messageText}`);

      receivedMassage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        received: true
      });

      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';

      break;
    } else {
      receivedMessage.innerHTML = "No more messages out at sea";
      //console.log("No more messages out at sea");
    }
  }
}

function sendAgain() {
  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}

function shuffleArray(_array) {
  // iterate backwards through an array
  for (let i = _array.length - 1; i > 0; i--) {

    // grab random index from 0 to i
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // swap elements _array[i] and _array[j]
    [_array[i], _array[randomIndex]] = [_array[randomIndex], _array[i]]; // using "destructuring assignment" syntax

    // same can be written as:
    // let arrayItem = _array[i]; // _array _arrayitem in original position array[i]
    // _arrayi] =_array[randomIndex]; // overwrite _array[i] with new item at random index
    // _array[randomIndex] = _arrayItem; // now move array item from original position into random position

  }
}
