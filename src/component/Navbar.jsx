import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../features/userDetailSlice'

const Navbar = () => {
  const allUsers = useSelector((state) => (state.app.users))
  const dispatch = useDispatch()
  const [searchData, setSearchData] = useState('')

  useEffect(() => {
    dispatch(searchUser(searchData))
  },[searchData])

  return (
    <div className='navbar'>
        <Link to='/' className='navbarElements'>Create Post</Link>
        <Link to='/read' className='navbarElements'>All Post ({allUsers.length})</Link>
        <input className='search' 
          placeholder='Search' 
          onChange={e => setSearchData(e.target.value)}/>
    </div>
  )
}

export default Navbar