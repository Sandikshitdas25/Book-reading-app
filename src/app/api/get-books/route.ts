import dbConnect from "@/lib/dbConnect";
import { Book } from "@/models/Book.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await dbConnect()
        const books = await Book.find()
        // console.log(books)
        // console.log(books.length)
        return NextResponse.json({
            success: true,
            message: "fetched",
            books: books
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "failed to fetch",

        })
    }
}