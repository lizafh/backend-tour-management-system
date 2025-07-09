import {Server} from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";


let server  : Server;


const startServer = async()=>{

    try{
   await mongoose.connect(envVars.DB_URL)

   console.log("connected to DB!")

//    server=app.listen(5000, ()=>{
//     console.log("Server is listening to port 5000");
//    });
   server=app.listen(envVars.PORT, ()=>{
    console.log(`Server is listening to port ${envVars.PORT}`);
   });
    }catch(error){
console.log(error);
    }

}
startServer()
// //////////////////////////
process.on("SIGTERM", ()=>{
console.log("SIGTERM signal received... Server shutting down.")

if(server){
    server.close(()=>{
process.exit(1)
    });
}
process.exit(1)
   
})
// //////////////////////
process.on("SIGINT", ()=>{
console.log("SIGINT signal received... Server shutting down.")

if(server){
    server.close(()=>{
process.exit(1)
    });
}
process.exit(1)
   
})
// //////////////////////
process.on("unhandledRejection", (err)=>{
console.log("Unhandled Rejection detected... Server shutting down.",err)

if(server){
    server.close(()=>{
process.exit(1)
    });
}
process.exit(1)
   
})
// ////////////////////
process.on("uncaughtException", (err)=>{
console.log("Uncaught Exception detected... Server shutting down.",err)

if(server){
    server.close(()=>{
process.exit(1)
    });
}
process.exit(1)
   
})

// unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// uncaught Exception error
// throw new Error("I forgot to handle this local error");
