import mongoose from "mongoose";


const mongodbUrl = process.env.MONGODB_URL;


if(!mongodbUrl){
    throw new Error("db error");
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

export const connectDb = async () => {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(mongodbUrl)
        .then((conn) => conn.connection)
        .catch((err) => {
            console.error("MongoDb connection error", err)
        throw err;
    })
    }

    try {
        const conn = await cached.promise;
        return conn
    } catch (error) {
        
    }
}