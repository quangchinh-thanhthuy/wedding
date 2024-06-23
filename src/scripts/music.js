const audio = document.getElementById("background-music");
let isMusicPlaying = true;
audio.muted = false;
audio.play();

function toggleMusic() {
  // Get the element
  const musicIcon = document.getElementById("music-icon");

  // Change the icon based on whether music is playing
  if (isMusicPlaying) {
    musicIcon.classList.remove("fa-volume-up");
    musicIcon.classList.add("fa-volume-xmark");
    musicIcon.alt = "Play Music";
    audio.pause();
  } else {
    musicIcon.classList.remove("fa-volume-xmark");
    musicIcon.classList.add("fa-volume-up");
    musicIcon.alt = "Mute Music";
    audio.play();
  }

  isMusicPlaying = !isMusicPlaying;
}
