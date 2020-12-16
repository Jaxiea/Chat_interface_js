const AllMessagesURL = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=4hbLloOBHnKP';
const POSTurl = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
var messages;
var known_data_stream = [];
var usr = "";

function getUserName(){

  var userName = window.prompt('Welcome to our cozy chatroom. \nWhat should everyone call you?', "");

  /* check input length */
  if (userName.length > 0 && userName.length < 20){
    usr = userName;
    getMessages();
  }
  else{
    alert("Your name shouldn't be empty or more than 20 characters.");
    getUserName();
  }

  /* clicking cancel on input prompt isn't handled. */
}

async function getMessages(){

  const response = await fetch(AllMessagesURL);
  const data = await response.json();
  known_data_stream = data;

  visualizeMessages(known_data_stream);
}

getUserName();


/* updateMessage() takes the entire current message history and compares it to the saved messages client-side. Inefficient. */
/* Given a bit more time, I'd implement a getMessagesBy(timestamp); and compare a set length of data streams, which can also ensure the delay()
used to levy the send and retrieve time to be always working. */

async function updateMessage(){

  const response = await fetch(AllMessagesURL);
  const data = await response.json();

  var current_data_stream = data;

//  console.log(known_data_stream);
//  console.log(data);

/* gotta slice the array correctly. */
  var new_data = current_data_stream.slice(known_data_stream.length, current_data_stream.length);
//  console.log("newdata", new_data);

  visualizeMessages(new_data);
  known_data_stream = current_data_stream;
}


function sendMessage(){
  const timestamp = Date.now();
  var txt = document.getElementById('Input_Box').value;
  txt = txt.replace("'", "&lsquo;");

  if (txt.length < 1){
    alert("Void is not allowed here.");
    return;
  }

  const messageObj = {
    message:txt,
    author:usr,
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(messageObj),
    headers: {
      'Content-Type': 'application/json',
      'token': '4hbLloOBHnKP',
    }
  }

  fetch(POSTurl, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));

}

/* Didn't figure this out in time */


function send_n_refresh(){
  sendMessage();

  delay(2000)      /* 2000 won't always work, see comment above updateMessage(). */
  .then(() => {
    updateMessage();
    console.log("delayed!");
  })
  .catch((err) => console.error(err));

}

/* Wait for the message to be sent then refresh list */
function delay(time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number'))
    } else {
      setTimeout(resolve, time);
    }
  });
}

//https://www.digitalocean.com/community/tutorials/js-async-functions



function visualizeMessages(data_stream){

  for (let i = 0; i < data_stream.length; i++){
    var node = document.createElement("div");
    var att = document.createAttribute("class");       // Create a "class" attribute
    att.value = "bubble";
    node.setAttributeNode(att);

    var author_container = document.createElement("div");
    var author_attribute = document.createAttribute("class");
    author_attribute.value = "author";
    author_container.setAttributeNode(author_attribute);
    /* get and set value from data */
    var author = document.createTextNode(data_stream[i].author);
    var tmp = data_stream[i].author;
    var tmp_usr = String(usr);

    author_container.appendChild(author);
    node.appendChild(author_container);


    //formatting for visualization, time and message
    var formattedTime = convertTimestamp(data_stream[i].timestamp);
    var formattedMessage = checkHTMLencode(data_stream[i].message);

    var message_container = document.createElement("div");
    var message_attribute = document.createAttribute("class");
    message_attribute.value = "message";
    message_container.setAttributeNode(message_attribute);
    var message = document.createTextNode(formattedMessage);
    message_container.appendChild(message);
    node.appendChild(message_container);
    /* get and set value from data */

    var time_container = document.createElement("div");
    var time_attribute = document.createAttribute("class");
    time_attribute.value = "time";
    time_container.setAttributeNode(time_attribute);
    var time = document.createTextNode(formattedTime);
    time_container.appendChild(time);
    node.appendChild(time_container);


    document.getElementById('Message_Screen').appendChild(node);

    if (tmp == tmp_usr){
      att.value = "bubble_me";
      console.log(att.value);
      node.setAttributeNode(att);
      var clear_div = document.createElement("div");
      clear_div.style.clear = 'both';
      document.getElementById('Message_Screen').appendChild(clear_div);
    }
  }

  document.getElementById("Input_Box").focus();
  /* Not implemented. Focus on the latest message. */
}


function convertTimestamp(stamp){

  var fullDate = new Date(stamp);
//  console.log(stamp);
//  console.log(fullDate);

//  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//  var day = days[fullDate.getDay()];

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var month = months[fullDate.getMonth()];

  var year = fullDate.getFullYear();

  var date = fullDate.getDate();

  var hours = fullDate.getHours();


  var minutes = "0" + fullDate.getMinutes();

  //    var seconds = "0" + date.getSeconds();

  // Will display time in weekday month/day \n 10:30 format
  var formattedTime = date + " " + month + " " + year + " " + hours + ':' + minutes.substr(-2);

  return formattedTime;

}

/* incomplete list of encoding exchange */
/* Either needs a better way, or completing. */

function checkHTMLencode(txt){
  var str = String(txt);

  if (str.search("&#x27;")){
    str = str.replaceAll("&#x27;", "'");
  }

  if (str.search("&amp;lsquo;")){
    str = str.replaceAll("&amp;lsquo;", "'");
  }

  if (str.search("&lt;")){
    str = str.replaceAll("&lt;", "<");
  }

  if (str.search("&gt;")){
    str = str.replaceAll("&gt;", ">");
  }

  if (str.search("&quot;")){
    str = str.replaceAll("&quot;", "\"");
  }
  if (str.search("&lt;")){
    str = str.replaceAll("&lt;", "<");
  }

  return str;
}
