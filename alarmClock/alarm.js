function formatTime(number) {
  return number < 10 ? "0" + number : number;
}

function updateTime() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = now.getHours() < 12 ? "AM" : "PM";
  const timeString = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + " " + ampm;
  document.getElementById("clock").textContent = timeString;
}

function setAlarm() {
  const hour = parseInt(document.getElementById("alarm-hour").value);
  const minute = parseInt(document.getElementById("alarm-minute").value);
  const second = parseInt(document.getElementById("alarm-second").value);
  const ampm = document.getElementById("alarm-ampm").value;
  const alarmTime = new Date();
  alarmTime.setHours(hour + (ampm === "PM" && hour !== 12 ? 12 : 0));
  alarmTime.setMinutes(minute);
  alarmTime.setSeconds(second);
  alarmTime.setMilliseconds(0);
  const alarmString = formatTime(hour) + ":" + formatTime(minute) + ":" + formatTime(second) + " " + ampm;
  const alarmList = document.getElementById("alarm-list");
  const existingAlarms = alarmList.getElementsByTagName("div");
  
  // Check if an alarm with the same time already exists
  for (let i = 0; i < existingAlarms.length; i++) {
    const alarmText = existingAlarms[i].childNodes[0].nodeValue;
    if (alarmText === alarmString) {
      alert("This alarm has already been set.");
      return;
    }
  }
  const alarmElement = document.createElement("div");
  const alarmText = document.createTextNode(alarmString);
  alarmElement.appendChild(alarmText);
  const deleteButton = document.createElement("button");
  const deleteText = document.createTextNode("Delete");
  deleteButton.appendChild(deleteText);
  
  deleteButton.addEventListener("click", function() {
      alarmList.removeChild(alarmElement);
  });
  alarmElement.appendChild(deleteButton);
  alarmList.appendChild(alarmElement);
  const now = new Date();
  var audio = new Audio("ping.mp3");
  if (alarmTime <= now) {
        audio.play();
      alert("Hey you have Alarm!");
      audio.pause();
      
  }
  else {
      setTimeout(function() {
        audio.play();
          alert("Hey you have Alarm!");
          audio.pause();
          alarmList.removeChild(alarmElement);
      }, alarmTime - now);
      
  }
}

setInterval(updateTime, 1000);
document.getElementById("set-alarm").addEventListener("click", setAlarm);
