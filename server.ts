import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

const io = new Server({
	cors:{
		origin:true,
		credentials:true
	}
})

io.on("connection",(socket)=>{
	// IF USER CONNECTTED
	console.log(`socket user ${socket.id} connected`)

	socket.on("disconnect",(r)=>{
		console.log("user " + socket.id + " disconnect !!")
	})
	
	// LISTEN DATA FROM CLIENT 
	socket.on("newMSG",(p)=>{
		console.log(`new msg  : ${p}` )
		// SEND TO ALL CLIENT
		io.emit("sendallMSG",{data:p})
	})



})
await serve(io.handler(),{
	port:3000
})
