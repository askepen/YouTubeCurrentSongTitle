var desc          = document.getElementById('eow-description');
var videoTitle    = document.getElementById('eow-title');
var player        = document.getElementById('movie_player').wrappedJSObject;
var originalTitle = videoTitle.innerHTML;
var timeCodesText = desc.getElementsByTagName('a');

var timeCodesSeconds    = [];
var timeCodeToSongTitle = [];

var currentTime      = 0;
var currentSongTitle = "";
var songIndex        = 0;

generateTimeCodes();

var titleUpdaterInterval = setInterval(titleUpdater, 1000);

function generateTimeCodes(){
  for (var i = 0; i < timeCodesText.length; i++) {
    var t = textToSeconds(timeCodesText[i].innerHTML);

    if (!isNaN(t)) {
      timeCodesSeconds.push(t);
      timeCodeToSongTitle.push( [t, getDescLine(i)] );
    }
  }

  if(timeCodesSeconds.length <= 0)
    clearInterval(titleUpdaterInterval);
}

function titleUpdater (){
  if (player.getPlayerState() != 1) return;
  currentTime   = Math.floor(player.getCurrentTime());

  findCorrectSong();

  videoTitle.innerHTML = originalTitle + '<i> ' + currentSongTitle + '</i>';
}

function findCorrectSong(){
  while(currentTime < timeCodeToSongTitle[songIndex][0])
    songIndex--;

  while(currentTime >= timeCodeToSongTitle[songIndex+1][0])
    songIndex++;

  currentSongTitle = timeCodeToSongTitle[songIndex][1];
}

function getDescLine(index){

  var posTimecode   = desc.innerHTML.indexOf(timeCodesText[index].innerHTML);
  var posEndTitle   = desc.innerHTML.lastIndexOf('<a href', posTimecode);
  var posPrevLine   = desc.innerHTML.lastIndexOf('<br>', posEndTitle);
  var posStartTitle = posPrevLine + 4;

  return desc.innerHTML.slice(posStartTitle,posEndTitle);
}

function textToSeconds(text){
  var firstColon  = text.indexOf(':');
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
