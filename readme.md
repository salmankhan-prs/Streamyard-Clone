# Streamyard Clone

A simple project to explore RTMP servers and FFmpeg. 🚀

Please note: I tried this on a random weekend just to explore RTMP servers and FFmpeg. I know I haven't followed any code quality/best practices here 😜

This project is simple - the user allows camera and mic access in the browser, where we record the video using the built-in `MediaRecorder` feature. We listen to MediaRecorder events and send the stream to the backend using Socket.IO. On receiving it in the backend, we pass the received binary data to FFmpeg. Here, while starting FFmpeg, we'll pass the necessary options, including the RTMP server link.

Note:  before Running this install ffmpeg locally

