"use client"
import { signOut } from 'next-auth/react'

const Navbar = () => {
    return (
        <nav className="bg-gray-800 h-16 text-white flex items-center justify-between">

            <div className="font-semibold text-4xl ml-5 flex items-center cursor-pointer">
                <span>Code</span>
                <span className="invert"><img src="../images/shelf.svg" className='h-8' /></span>
                <span>Shelf</span>
            </div>

            <div className="bg-white rounded px-4 py-1 mr-5">
                <button className="text-gray-800 font-semibold" onClick={() => signOut()}>LogOut</button>
            </div>
        </nav>
    )
}

export default Navbar
