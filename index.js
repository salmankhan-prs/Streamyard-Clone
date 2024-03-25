import http from 'http';
import express from 'express';
import {Server as SocketIo} from 'socket.io'
const app =express()
import {spawn} from 'child_process'
app.use(express.static('./public'))
const server=http.createServer(app)
const io = new SocketIo(server)

//we can use ffmpeg to stream the video to save it to a file or we can manipulate the video's
const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'high',
    '-level', '5.2',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-ar', 128000 / 4,
    //'flags','bicubic',
    '-s', '3840x2160',
    '-f', 'mp4',
   `rtmp://a.rtmp.youtube.com/live2/your-stream-key`, //we can also use hls stream
   //"output.mp4"
];

const ffmpegProcess =spawn('ffmpeg',options)

 ffmpegProcess.stderr.on('data',(data)=>{
    console.log('data',data.toString())
})
io.on('connection',socket =>{
    console.log('socket connected ',socket.id)
    socket.on('binarystream',(stream)=>{
        ffmpegProcess.stdin.write((stream),(err)=>{
            console.log('ERR',err)
        })
    })
    socket.on('binaryend',()=>{
        ffmpegProcess.stdin.end()
    })
})

server.listen('3000',()=>{
    console.log("server started ")
})