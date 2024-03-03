import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const navLinks=[
    {
      name: "Home",
      path:"/",
    },
    {
      name: "New Arrival",
      path:"/newarrival",
    },
    {
      name: "Best Seller",
      path:"/bestseller",
    },
    {
      name: "Fiction",
      path:"/fiction",
    },
    {
      name: "Sci-Fi",
      path:"/scifi",
    },
  ]
  return (
    <div className=' bg-green-500 text-white'>
      <ul className="flex lg:justify-center justify-evenly items-center">
        {
          navLinks.map((link,idx)=>(
            <li key={idx} className="lg:px-6 lg:text-xl text-base py-3"><Link to={link.path}>{link.name}</Link></li>

          ))
        }
      </ul>
    </div>
  )
}

export default Header