var player = {};

player.el               = {};
player.el.container     = document.querySelector('.player');
player.el.audio         = player.el.container.querySelector('audio');
player.el.controls      = player.el.container.querySelector('.controls');
player.el.seek_bar      = player.el.controls.querySelector('.seek-bar');
player.el.seek_bar_full = player.el.seek_bar.querySelector('.full');
player.el.timer         = player.el.controls.querySelector('.timer');
//player.el.full_timer    = player.el.controls.querySelector('.full-timer');
//player.el.previous      = player.el.controls.querySelector('.prev');
//player.el.next          = player.el.controls.querySelector('.next');
player.el.info          = player.el.container.querySelector('.current-name');
player.el.illu          = player.el.container.querySelector('.illustration');
player.el.illu_img      = player.el.illu.querySelector('.current-illu');
player.el.f_controls    = player.el.illu.querySelector('.full-controls');

player.el.toggle_play   = player.el.f_controls.querySelector('.toggle-play');
player.el.level_bar     = player.el.controls.querySelector('.level-bar');
player.el.level_bar_prog= player.el.controls.querySelector('.progress');
player.el.replay        = player.el.f_controls.querySelector('.replay');
player.el.repeat        = player.el.f_controls.querySelector('.repeat');


// PLAYLIST
var playlist = new Array();
playlist[0] = ['ressources/josephine(1930_version).mp3', 'ressources/illustration/The_demon_diaries.jpg', 'Josephine (1930 version)', '4:34'];
playlist[1] = ['ressources/leprechaun.mp3', 'ressources/illustration/Bwa.jpg', 'Leprechaun', '2:15'];
playlist[2] = ['ressources/pixelated.mp3', 'ressources/illustration/Bwa.jpg', 'Pixelated', '3:01'];
playlist[3] = ['ressources/youre_joking.mp3', 'ressources/illustration/Bwa.jpg', "You're Joking", '2:33'];
playlist[4] = ['ressources/randy.m4a', 'ressources/illustration/Woman.jpg', 'Randy', '6:38'];
playlist[5] = ['ressources/pleasure.m4a', 'ressources/illustration/Woman.jpg', 'Pleasure', '4:16'];

var currentSong = 0,
    playlenght  = playlist.length,
    compteur    = 0;

function template_name_info(){
  for(var compteur = 0; compteur<playlenght; compteur++){
    var divInfo = "<div class='template-name name-" + compteur + "' title='" + compteur + "'>";
    divInfo    += "<div class='number'>";
    divInfo    += "<p>";
    divInfo    += compteur + 1;
    divInfo    += "</p>";
    divInfo    += "</div>";
    divInfo    += "<div class='name'>";
    divInfo    += "<p>" + playlist[compteur][2] + '</p>';
    divInfo    += "</div>";
    divInfo    += "<div class='time'>";
    divInfo    += "<p>" + playlist[compteur][3] + '</p>';
    divInfo    += "</div>";

    player.el.info.innerHTML = player.el.info.innerHTML + divInfo;
  }
  player.el.info.querySelector('.name-0').id = "is-playing";
}
template_name_info();




// Selection Template-Name
player.el.template = document.querySelectorAll('.template-name');
// Event on music's name Click 
function click_name(){
  //  var prev_this = player.el.info.querySelector('.name-0');
  var prev_this = 0;

  for(var i = 0; i<player.el.template.length; i++){
    player.el.template[i].addEventListener('click', function(){

      // ?audio en cours = audio au clic? 
      if (player.el.audio.getAttribute('src', playlist[this.getAttribute('title')][0]) != playlist[this.getAttribute('title')][0] ) {

        // ADD-REMOVE ID
        player.el.info.querySelector('.name-' + prev_this).id = "";
        this.id = "is-playing";
        prev_this = player.el.info.getAttribute('title');
        prev_this = this.getAttribute('title');

        //changement de piste de lecture
        player.el.audio.setAttribute('src', playlist[this.getAttribute('title')][0]);
        player.el.audio.setAttribute('title', this.getAttribute('title'));
          
        //changement d'illustration
        player.el.illu_img.setAttribute('src', playlist[this.getAttribute('title')][1]);
        player.el.audio.play();
      }
    })
  }
}
click_name();

window.setInterval(function timer(){
  if (player.el.audio.duration == player.el.audio.currentTime){
    console.log('time out');
    console.log(player.el.info.getAttribute('title'));
  }
}, 500);



// -----------------------------------------------------//

// Toggle PLAY
player.el.toggle_play.addEventListener('click', function(event){
  event.preventDefault();
  if(player.el.audio.paused)
    player.el.audio.play();
  else
    player.el.audio.pause();
});
// Play icon
player.el.audio.addEventListener('play', function(){
  player.el.container.classList.add('playing');
});
// Pause icon
player.el.audio.addEventListener('pause', function(){
  player.el.container.classList.remove('playing');
});


// FULL Seek-bar Progress Click
player.el.seek_bar.addEventListener('click', function(event){
  event.preventDefault();

  var seek_bar_width = player.el.seek_bar.offsetWidth,
      seek_bar_left  = player.el.seek_bar.offsetLeft,
      mouse_x        = event.clientX,
      ratio          = (mouse_x - seek_bar_left) / seek_bar_width,
      time           = ratio * player.el.audio.duration;

  player.el.audio.currentTime = time;
  player.el.container.classList.add('playing');
  player.el.audio.play();
});
// FULL Seek-bar PROGRESS
window.setInterval(function(){
  var duration = player.el.audio.duration,
      time     = player.el.audio.currentTime,
      ratio    = time / duration;

  player.el.seek_bar_full.style.transform = 'scaleX(' + ratio + ')';
}, 50 );

// TIMER
window.setInterval(function timer() {
  var time = player.el.audio.currentTime,
      mins  = Math.floor((time % 3600) / 60),
      secs  = Math.floor(time % 60);

  if (secs < 10) secs = "0" + secs;
  if (mins < 10) mins = "0" + mins;
  player.el.timer.innerText = mins + ":" + secs;
}, 250);

// FULL-TIMER
//window.setInterval(function fullTimer() {
//  var time = player.el.audio.duration,
//      mins  = Math.floor((time % 3600) / 60),
//      secs  = Math.floor(time % 60);
//
//  if (secs < 10) secs = "0" + secs;
//  if (mins < 10) mins = "0" + mins;
//  player.el.full_timer.innerText = mins + ":" + secs;
//}, 250);

// Gestion du VOLUME
player.el.level_bar.addEventListener('click', function(event){
  event.preventDefault();

  var level_bar_width = player.el.level_bar.offsetWidth,
      level_bar_left   = player.el.level_bar.offsetLeft,
      mouse_x         = event.clientX,
      ratio           = (mouse_x - level_bar_left) / level_bar_width,
      volum           = Math.round(ratio*12)/12;

  player.el.audio.volume = volum;
  player.el.level_bar_prog.style.transform = 'scaleX(' + volum + ')';
});

// REPLAY button
player.el.replay.addEventListener('click', function(event){
  event.preventDefault();
  player.el.audio.currentTime = 0;
});
// REPEAT button
player.el.repeat.addEventListener('click', function(event){
  event.preventDefault();
  if(player.el.audio.loop == false)
  {
    player.el.audio.loop = true;
    player.el.repeat.style.opacity = 1;
  }
  else
  {
    player.el.audio.loop = false;
    player.el.repeat.style.opacity = 0.3;  
  }
});




// NEXT PREV
//player.el.previous.addEventListener('click', function(event){
//  event.preventDefault();
//  currentSong --;
//  if (currentSong <= 0)
//    currentSong = playlenght - 1;
//
//  player.el.audio.setAttribute('src', playlist[currentSong][0]);
//  player.el.audio.play();
//});
//
//player.el.next.addEventListener('click', function(event){
//  event.preventDefault();
//  currentSong ++;
//  if (currentSong >= playlenght)
//    currentSong = 0;
//
//  player.el.audio.setAttribute('src', playlist[currentSong][0]);
//  player.el.audio.play();
//});



// EVENT Clavier
// .onkeydown
document.addEventListener('keydown', function(event){
  event.preventDefault();
  keys = event.keyCode;
  if(keys == 75 || keys == 32){
    if(player.el.audio.paused)
      player.el.audio.play();
    else
      player.el.audio.pause();
  }
  if(keys == 39) player.el.audio.currentTime += 5;
  if(keys == 37) player.el.audio.currentTime -= 5;
});