const AllMessagesURL = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=4hbLloOBHnKP';
const POSTurl = 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0';
var messages;

async function getMessages(){

  const response = await fetch(AllMessagesURL);
  const data = await response.json();
  //  console.log(data);

  for (let i = 0; i < data.length; i++){
    var node = document.createElement("li");
    var author = document.createTextNode(data[i].author);

    var formattedTime = convertTimestamp(data[i].timestamp);
    var formattedMessage = checkHTMLencode(data[i].message);

    var time = document.createTextNode(formattedTime);         // Create a text node
    var message = document.createTextNode(formattedMessage);
    node.appendChild(author);
    node.appendChild(message);
    node.appendChild(time);
    document.getElementById('Message Screen').appendChild(node);
  }
}

/* incomplete list of encoding exchange */
/* Either needs a better way, or completing. */

function checkHTMLencode(txt){
  var str = String(txt);

  if (str.search("&#x27;")){
    str = str.replaceAll("&#x27;", "'");
  }

  if (str.search("lsquo;")){
    str = str.replaceAll("lsquo;", "'");
  }

  if (str.search("&lt;")){
    str = str.replaceAll("&lt;", "<");
  }

  if (str.search("&gt;")){
    str = str.replaceAll("&gt;", ">");
  }
  if (str.search("&amp;")){
    str = str.replaceAll("&amp;", "&");
  }
  if (str.search("&quot;")){
    str = str.replaceAll("&quot;", "\"");
  }
  if (str.search("&lt;")){
    str = str.replaceAll("&lt;", "<");
  }

  return str;
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



function sendMessage(){
  const timestamp = Date.now();
  var txt = document.getElementById('Input Box').value;
  txt = txt.replace("'", "&lsquo;");

  if (txt.length < 1){
    alert("Void is not allowed here.");
    return;
  }

  const messageObj = {
    message:txt,
    author:"Pete"
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

async function send_n_refresh(){
  await sendMessage();
}

//  sendMessage();
getMessages();

//asychronous! What to do?
