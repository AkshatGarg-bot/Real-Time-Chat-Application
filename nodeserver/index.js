//node server
const io =  require("socket.io")(2200);
const users = {};

io.on('connection' , socket=>{

 console.log("here");
    socket.on("new-user-joined",name=>{
        console.log("aagya", name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined" , name);

    });
    socket.on("send",message=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
    });
    socket.on("disconnect",message=>{
        socket.broadcast.emit("leaving",users[socket.id])
        delete users[socket.id];
    });

    
})