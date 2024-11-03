import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs"
import { UserModel } from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";

//function to authenticate user and inject some details in jwt and session
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",  //name first letter should be capital
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.username } //we havenot add this functionality but for the future we added
                        ]
                    })

                    console.log(user)

                    if (!user) {
                        throw new Error("No user found")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password) //we dont have to write credentials.identifier in case of password

                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error("Incorrect password")
                    }

                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                token.email = user.email,  //we can user user.username and this all because we defined those in next-auth.d.ts file
                token.username = user.username
            }
            return token
        }
       
    },
    pages: {
        signIn: "/", //by defining like this we dont need to make a extra page for signin , the next-auth will handle all the things related to signin
        //we can do this for other authentication pages also
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}