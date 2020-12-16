const AllMessagesURL = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=4hbLloOBHnKP';
const POSTurl = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
var messages;
var known_data_stream = [];
var usr = "";

/* -------- Get Username with prompt ---------- */
getUserName();

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


/* --------  retrieve all messages at server ---------*/

async function getMessages(){

  const response = await fetch(AllMessagesURL);
  const data = await response.json();
  known_data_stream = data;

  visualizeMessages(known_data_stream);
}


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


/* ------- Post message to server  ------- */
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


/* -------------- Called by clicking submit button, send current message and display new messages --------- */
function send_n_refresh(){
  sendMessage();

  delay(2000)      /* 2000 won't always work, see comment above updateMessage(). */
  .then(() => {
    updateMessage();
    console.log("delayed!");
  })
  .catch((err) => console.error(err));

}

/* -------- Wait for the message to be sent then refresh list -------- */
function delay(time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number'))
    } else {
      setTimeout(resolve, time);
    }
  });
}


/* ------ visualize messages by <div class="bubble"></div>  with children divs: message, author and time ----------- */
/* ------ Message from username will be <div class="bubble bubble_me"></div> ------------ */
/* ------ .bubble is child to #Message_Screen ---------- */

function visualizeMessages(data_stream){

  for (let i = 0; i < data_stream.length; i++){
    var node = document.createElement("div");
    var att = document.createAttribute("class");
    att.value = "bubble";
    node.setAttributeNode(att);

    /* Author Section */
    var author_container = document.createElement("div");
    var author_attribute = document.createAttribute("class");

    author_attribute.value = "author";
    author_container.setAttributeNode(author_attribute);

    var author = document.createTextNode(data_stream[i].author);
    author_container.appendChild(author);
    node.appendChild(author_container);


    //formatting for visualization, time and message
    var formattedTime = convertTimestamp(data_stream[i].timestamp);
    var formattedMessage = checkHTMLencode(data_stream[i].message);

    /* Message section */
    var message_container = document.createElement("div");

    var message_attribute = document.createAttribute("class");
    message_attribute.value = "message";
    message_container.setAttributeNode(message_attribute);

    var message = document.createTextNode(formattedMessage);
    message_container.appendChild(message);
    node.appendChild(message_container);


    /* Time Section */
    var time_container = document.createElement("div");

    var time_attribute = document.createAttribute("class");
    time_attribute.value = "time";
    time_container.setAttributeNode(time_attribute);

    var time = document.createTextNode(formattedTime);
    time_container.appendChild(time);
    node.appendChild(time_container);


    document.getElementById('Message_Screen').appendChild(node);


    /* bubble_me checking last because a clear_div needs to be attached at the end of everything in this loop */
    var tmp = data_stream[i].author;
    var tmp_usr = String(usr);

    if (tmp == tmp_usr){
      att.value += " bubble_me";
      console.log(att.value);
      node.setAttributeNode(att);
      var clear_div = document.createElement("div");
      clear_div.style.clear = 'both';
      document.getElementById('Message_Screen').appendChild(clear_div);
    }
  }

//  document.getElementById("Input_Box").focus();
  /* Not implemented. Focus on the latest message. */
}


function convertTimestamp(stamp){

/* Get the numbers in DATE */
  var fullDate = new Date(stamp);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = months[fullDate.getMonth()];
  var year = fullDate.getFullYear();
  var date = fullDate.getDate();
  var hours = fullDate.getHours();
  var minutes = "0" + fullDate.getMinutes();
  //    var seconds = "0" + date.getSeconds();


  // Will display time in day, month, year, time (in 10:30 format)
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
