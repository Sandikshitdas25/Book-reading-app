"use client"

import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Books } from '@/models/Book.model'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'


const page = () => {
  const { data: session } = useSession()
  const [books, setBooks] = useState<Books[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const getBooks = async () => {

      const fetchBooks = await axios.get('/api/get-books')
      setBooks(fetchBooks.data.books)

    }

    getBooks()
  }, [])


  return (
    <>
      <Navbar />
      <div className='font-semibold text-3xl mt-7 ml-5'>Welcome, {session?.user?.email || "Sandikshit"}</div>
      <div className='font-semibold text-xl mt-8 ml-2'>
        <div>Your books</div>
        <div className='flex gap-6 flex-wrap ml-10 mt-8'>
          {books.map((book, index) => {
            return <Link href={`/book/${book.bookname}`} key={index}>
              <div className="border border-gray-800 rounded mt-4 h-96 w-64 bg-gray-800 relative flex items-center justify-center cursor-pointer">
                <img className="object-contain w-60 h-80" src={`../images/${book.bookname}.png`} />
              </div></Link>
          })}
        </div>


      </div>
    </>
  )
}

export default page
