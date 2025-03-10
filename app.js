const express=require('express');
const http=require('http');


const PORT =process.env.PORT || 3000;

const app=express();
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

const server = http.createServer(app);
const io= require('socket.io')(server);


//Make pubilc accessible from application
app.use(express.static("public"));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "public/index.html");
});

app.get("/hello",(req,res)=>{
    res.send("Hello World");
});

let connectedPeers=[];

io.on("connection",(socket)=>{
   connectedPeers.push(socket.id);

   console.log("user Connected");
   console.log(connectedPeers);

   //Handle pre-offer which is the initiation of a connection
    socket.on("pre-offer", (data) => {

        const { calleePersonalCode,callType} = data;
       
        const connectedPeer = connectedPeers.find((peerSocketId) => {
             return  peerSocketId === calleePersonalCode;
        });

        //console.log(connectedPeer);
        if(connectedPeer){
            const data = {
                callerSocketId: socket.id,
                callType,
            };

        io.to(calleePersonalCode).emit("pre-offer", data);
        }else{
            const data = {
                preOfferAnswer:'CALLEE_NOT_FOUND'
            }
            io.to(socket.id).emit("pre-offer-answer",data);
        }

    });

    //Handles connecton disconnect
   socket.on("disconnect",()=>{
    console.log("user disconnected")
    
        const newConnectedPeers=connectedPeers.filter(
            (peerSocketId) => peerSocketId !== socket.id
        );

        connectedPeers=newConnectedPeers;
        console.log(connectedPeers);
   });

   //Listen to pre-offer-answer
   socket.on("pre-offer-answer", (data) => {

    const { callerSocketId } = data;
    const connectedPeer = connectedPeers.find((peerSocketId) => {
        return  peerSocketId === callerSocketId;
   });

   if(connectedPeer) {
    io.to(callerSocketId).emit("pre-offer-answer",data);

   }

   });
});


server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});
