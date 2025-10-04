import express from 'express'
import http from 'http'
import "dotenv/config";
import connectDB from './lib/db.js'
import {Server} from 'socket.io'
import userRouter from './router/userRouter.js'
import messageRouter from './router/messageRoutes.js'
import cors from 'cors'


await connectDB();

const app = express()
const server = http.createServer(app)

//initialize socket.io server
export const io = new Server(server, { cors: { origin: "*" } });

//store online users
export const userSocketMap = {};

//socket.io connection handler
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId)
    if(userId){
         userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    socket.on("disconnected", () => {
        console.log("userDisconnected", userId);
        delete userSocketMap[userId];
         io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
});

app.use(express.json({limit: "4mb"}));
app.use(cors())



app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);


app.get('/', function(req,res){
    res.send("welcome")
})

if(process.env.NODE_ENV !== 'production'){
server.listen(process.env.PORT  || 8000, () => {
    console.log(`server is running on port ${process.env.PORT || 5000}`);
})
}



export default {app,server};