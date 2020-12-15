const AllMessagesURL = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=4hbLloOBHnKP';
const POSTurl = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
var messages;
var known_data_stream = [];
var usr = "";

function getUserName(){

  var userName = window.prompt('Welcome to this cozy chatroom. \nWhat should everyone call you?', "");

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

function visualizeMessages(data_stream){

  for (let i = 0; i < data_stream.length; i++){
    var node = document.createElement("li");
    var author = document.createTextNode(data_stream[i].author);

    //format for visualization
    var formattedTime = convertTimestamp(data_stream[i].timestamp);
    var formattedMessage = checkHTMLencode(data_stream[i].message);

    var time = document.createTextNode(formattedTime);         // Create a text node
    var message = document.createTextNode(formattedMessage);
    node.appendChild(author);
    node.appendChild(message);
    node.appendChild(time);
    document.getElementById('Message Screen').appendChild(node);
  }
}

getUserName();


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



function convertTimestamp(stamp){

  var fullDate = new Date(stamp * 1000);

  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var day = days[fullDate.getDay()];

  var month = fullDate.getMonth();

  var date = fullDate.getDate();

  var hours = fullDate.getHours();

  var minutes = "0" + fullDate.getMinutes();

  //    var seconds = "0" + date.getSeconds();

  // Will display time in weekday month/day \n 10:30 format
  var formattedTime = hours + ':' + minutes.substr(-2) + " " + day + " " + month + "/" + date;

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
  .then(res => console.log(res));

}


/* Didn't figure this out in time */

/*
async function send_n_refresh(){
  await sendMessage();
  updateMessage();
}
*/
