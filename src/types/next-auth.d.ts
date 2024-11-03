import "next-auth"
import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface User {
        email?: string,
        username?: string
    }

    interface JWT {
        email?: string,
        username?: string
    }

}