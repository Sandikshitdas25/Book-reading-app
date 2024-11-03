import mongoose, { Schema } from "mongoose"


export interface Books extends Document{
    bookname: string
}

const bookSchema =  new Schema({
    bookname: String
})

export const Book = (mongoose.models.Book) || (mongoose.model("Book", bookSchema))