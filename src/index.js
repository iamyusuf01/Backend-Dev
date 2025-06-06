import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
        app.on("error", (error) => {
            console.log("ERR: ", error)
            throw error
        })
    })
})
.catch((err) => {
    console.log("Mongo DB connection failed !!! ", err);
})




/* import express from "express";
const app = express()
( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listing on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error: ", error)
        throw err
    }
})() */