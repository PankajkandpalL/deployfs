const express =require("express");
const {connection} = require("./db");
const { userRouter } = require("./routes/userRoutes");
const {noteRouter} = require("./routes/noteRoutes")
const dotenv = require("dotenv").config()
const cors = require('cors');


const app = express();
const PORT= process.env.PORT;
app.use(cors());


app.use(express.json());
app.use("/users",userRouter)
app.use("/note", noteRouter);

let count = 0;
app.get("/",(req,res)=>{
    // console.time("Response Time");
    res.send("Home Page")
    // console.timeEnd("Response Time");
})

app.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running on port ${PORT} and db is also connected`)
    } catch (error) {
        console.log(error)
    }
})