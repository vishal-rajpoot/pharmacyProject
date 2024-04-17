const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const fetch = require("node-fetch");

// function for send push notification to mobile
async function sendPushNotification(mobileToken) {
  const message = {
    to: mobileToken,
    sound: 'default',
    title: 'Original Title',
    body: 'Message from QP Nurse',
    data: { someData: 'goes here' },
  };
  let result = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  return result = await result.json()

}

// push notification to mobile trigger
exports.sendNotification = functions.firestore.document('/chat-rooms/{rooms}').onUpdate((change, context) => {
  let data = change.before.data()
  let updatedData = change.after.data()
  const mobileToken = data.mobiletoken
  // console.log('MOBILE TOKEN:', mobileToken)
  if (data.timestamp !== updatedData.timestamp) {
    const response = sendPushNotification(mobileToken)
    return response
  }
});


// funtion for update user password 
const updateUserPassword = async () => {
  const userRef = db.collection("users").doc("update-users")
  let userData = await userRef.get()
  userData = userData.data()
  // console.log("userInfo", userData)
  let result = await fetch(`https://qpapi.maitretech.com/api/classes/_User/${userData.userid}`, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Parse-Application-Id": "APPLICATION_ID",
      "X-Parse-Master-Key": "MASTER_KEY"
    },
    body: JSON.stringify({ password: userData.password })
  });
  result = await result.json();
}

// update user password function tigger
exports.updateUserPassword = functions.firestore.document('/users/{user}').onUpdate((change, context) => {
  let data = change.before.data()
  let updatedData = change.after.data()
  if (data.timestamp !== updatedData.timestamp) {
    const response = updateUserPassword()
    return response
  }
});