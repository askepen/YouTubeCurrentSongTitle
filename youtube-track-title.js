var desc          = document.getElementById('eow-description');
var videoTitle    = document.getElementById('eow-title');
var player        = document.getElementById('movie_player').wrappedJSObject;
var currentTime;
var originalTitle = videoTitle.innerHTML;
var timeCodesText = desc.getElementsByTagName('a');
var timeCodesSeconds = [];

for (var i = 0; i < timeCodesText.length; i++) {
  var t = textToSeconds(timeCodesText[i].innerHTML);

  if(!isNaN(t))
    timeCodesSeconds.push(t);
}

//var hasTimecodes = timeCodesSeconds.length > 0;

var titleUpdaterInterval = setInterval(titleUpdater, 1000);

function titleUpdater (){
  if (player.getPlayerState() != 1) return;
  currentTime   = Math.floor(player.getCurrentTime());

  videoTitle.innerHTML = originalTitle + '<i>' + currentTime.toString() + '</i>';
}

function textToSeconds(text){
  var firstColon   = text.indexOf(':');
  var secondColon = text.lastIndexOf(':');
  var t_hours   = '0';
  var t_minutes = '0';
  var t_seconds = '0';

  if (secondColon != firstColon) {
    t_hours   = text.slice(0,firstColon);
    t_minutes = text.slice(firstColon+1,secondColon);
  }
  else {
    t_minutes = text.slice(0,firstColon);
  }

  t_seconds = text.slice(secondColon+1);

  return parseInt(t_hours*60*60)+parseInt(t_minutes*60)+parseInt(t_seconds);
}
