// Get references to the audio element and the progress bar.
const progressBar = document.getElementById("progress-bar");

let currentSong = 0; // array index 0
let songList = ["Dhundhala", "MiAmore", "945"];
let songName = ["Dhundhala","Mi Amore","9:45"]
let artistName = ["Yashraj, Talwiinder, Dropped Out","Sharn · 40K · The Paul","Prabh"]
let songImageList = ["./images/Dhundhala.jpg","./images/MiAmore.jpg","./images/945.jpg"]
let audio;

const playSong = document.querySelector(".play");
const pauseSong = document.querySelector(".pause");
const forward = document.querySelector(".forward");
const previous = document.querySelector(".previous");
let title = document.querySelector(".title");
let description = document.querySelector(".description");
let songImg = document.querySelector(".image");
let duration = document.querySelector(".duration");
let starting = document.querySelector(".starting");

playSong.addEventListener("click", play);
pauseSong.addEventListener("click", pause);
forward.addEventListener("click", forwardSong);
previous.addEventListener("click", previousSong);

function newWindow() {
  pauseSong.classList.add("active");
  currentSong = 0;
  audio = new Audio(`${songList[currentSong]}.mp3`);
  title.innerHTML = songName[currentSong];
  description.innerHTML = artistName[currentSong];
  songImg.src = songImageList[`${currentSong}`];
}
newWindow();

function play() {
  playSong.classList.add("active");
  pauseSong.classList.remove("active");
  //   audio.src = `${songList[currentSong]}.mp3`;
  audio.play();
  setInterval(()=>{
      let seconds = Math.trunc(audio.currentTime);
      let minutes = Math.floor(seconds / 60);
      // if(minutes < 1)
      // {
        starting.innerHTML = `${Math.trunc(audio.currentTime)} seconds`;
      // }
      // else
      // {
      //   starting.innerHTML = minutes;
      // }
      duration.innerHTML = `${Math.trunc(audio.duration)} seconds`;
      
  },1000)
  songImg.classList.add("animation");
}

function pause() {
  playSong.classList.remove("active");
  pauseSong.classList.add("active");
  audio.pause();
  songImg.classList.remove("animation");
}

function forwardSong() {
  if (currentSong == 2) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  //   audio = new Audio(`${songList[currentSong]}.mp3`);
  console.log(currentSong);
  title.innerHTML = songName[currentSong];
  description.innerHTML = artistName[currentSong];
  songImg.src = songImageList[`${currentSong}`];
  songImg.classList.add("animation");
  audio.src = `${songList[currentSong]}.mp3`;
  audio.play();
  //   audio = new Audio(`${songList[currentSong]}.mp3`)
}

function previousSong() {
  if (currentSong == 0) {
    currentSong = 2;
  } else {
    currentSong--;
  }
  console.log(currentSong);
  title.innerHTML = songName[currentSong];
  description.innerHTML = artistName[currentSong];
  songImg.src = songImageList[`${currentSong}`];
  songImg.classList.add("animation");
  audio.src = `${songList[currentSong]}.mp3`;
  audio.play();
  //   audio = new Audio(`${songList[currentSong]}.mp3`)
}

// Add an event listener to update the progress bar as the audio plays.
audio.addEventListener("timeupdate", updateProgressBar);

// Function to update the progress bar.
function updateProgressBar() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const percentage = (currentTime / duration) * 100;
  progressBar.style.width = percentage + "%";
}

// Add an event listener to allow seeking by clicking on the progress bar.
progressBar.parentElement.addEventListener("click", seek);

// Function to seek the audio to the clicked position.
function seek(e) {
  const clickX = e.clientX - progressBar.parentElement.offsetLeft;
  const progressBarWidth = progressBar.parentElement.clientWidth;
  const seekTime = (clickX / progressBarWidth) * audio.duration;
  audio.currentTime = seekTime;
}
