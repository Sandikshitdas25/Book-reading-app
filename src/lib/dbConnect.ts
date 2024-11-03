
import mongoose from "mongoose";
import { NextResponse } from "next/server";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

export default async function dbConnect() {
    
    if(connection.isConnected){
        console.log("Already connected to the database")
        return
    }

    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI || '')
        connection.isConnected = connect.connections[0].readyState
        console.log("DB connected successfully")

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "DB failed to connect"
        })
    }
}