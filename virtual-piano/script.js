const piano = document.querySelector('.piano');
const collectionPiano = document.querySelectorAll('.piano-key');

function playAudio(event) {
  //active status keys mouse event and play audio
  event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
  const note = event.target.dataset.note;
  const audio = document.querySelector(`audio[data-note='${note}']`);
  audio.currentTime = 0;
  audio.play();
}

function removeActiveKey(event) {
  //remove active status keys mouse event
  event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

function startKeyActive(event) {
  //mouseover and mouseout events for active status keys, pseudo and play audio
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
  }
  collectionPiano.forEach((el) => {
    el.addEventListener('mouseover', playAudio);
    el.addEventListener('mouseout', removeActiveKey);
  });
}

function stopKeyIActive() {
  //remove mouseover and mouseout events for active status keys, pseudo and play audio
  collectionPiano.forEach((el) => {
    el.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    el.removeEventListener('mouseover', playAudio);
    el.removeEventListener('mouseout', removeActiveKey);
  });
}

piano.addEventListener('mousedown', startKeyActive);
piano.addEventListener('mousedown', playAudio);
document.addEventListener('mouseup', stopKeyIActive);


function pressKeyAudio (event) {
  // Event keyboard - play audio
  if (event.repeat) {
    return;
  }
  const audioKeys = document.querySelector(
    `audio[data-key='${event.keyCode}']`
  );
  const pianoKey = document.querySelector(
    `.piano-key[data-key='${event.keyCode}']`
  );
  audioKeys.currentTime = 0;
  audioKeys.play();
  pianoKey.classList.add('piano-key-active');

  window.addEventListener('keyup', () => {
    pianoKey.classList.remove('piano-key-active');
  });
}

window.addEventListener('keydown', pressKeyAudio);


// API fullscreen

const btnFullscreen = document.querySelector('.fullscreen');

function toggleScreen() {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}

btnFullscreen.addEventListener('click', toggleScreen);

//Toggle notes/letters

const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

function changeLetters() {
  collectionPiano.forEach((el) => {
    el.classList.add('piano-key-letter');
  });
  btnLetters.classList.add('btn-active');
  btnNotes.classList.remove('btn-active');
}

function changeNotes() {
  collectionPiano.forEach((el) => {
    el.classList.remove('piano-key-letter');
  });
  btnNotes.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');
}

btnLetters.addEventListener('click', changeLetters);
btnNotes.addEventListener('click', changeNotes);
