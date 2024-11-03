import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {

    await dbConnect()
    const {email, password, username} = await request.json()
    console.log(email)
    console.log(password)
    console.log(username)
    try {
        
        const user = await UserModel.findOne({email})
        if(user){
            return NextResponse.json({
                success: false,
                message: "User already registered"
            })
        }

        const newUser = UserModel.create({
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10)
        })

        
        return NextResponse.json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "User registration failed"
        })
    }

}