const userVideo = document.getElementById("user-video");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const socket = io();
const state = { media: null };

window.addEventListener("load", async () => {
  const media = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  userVideo.srcObject = media;
  state.media = media;
});
let mediaRecorder;
startBtn.addEventListener("click", () => {
  mediaRecorder = new MediaRecorder(state.media, {
    audioBitsPerSecond: 12800,
    videoBitsPerSecond: 2500000,
    framerate: 25,
  });

  mediaRecorder.ondataavailable = (ev) => {
    socket.emit("binarystream", ev.data);
  };
  mediaRecorder.start(25);
});

stopBtn.addEventListener("click", () => {
  mediaRecorder.stop();
  socket.emit("binaryend");
});
