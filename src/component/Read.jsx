import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/userDetailSlice'
import CustomModal from './CustomModal'
import { Link } from 'react-router-dom'

const Read = () => {
  const dispatch = useDispatch()
  const {users, loading, searchData} = useSelector((state) => state.app)
  const [id, setId] = useState()
  const [showPopUp, setShowPopUp] = useState(false)
  const [radioData, setRadiodata] = useState('')

  useEffect(() => {
    dispatch(showUser())
  },[])

  if(loading){
    return (<h2 className='head'>Loading...</h2>)
  }

  return (
    <div>
      {showPopUp && <CustomModal id={id} setShowPopUp={setShowPopUp}/>}
      <h2 className='head'>All Data</h2>
      <div className='genderFilterRadio'>
        <input type="radio" 
          id='All' 
          name='gender'
          value=''
          onChange={e => setRadiodata(e.target.value)}
          checked={radioData === ''} />
        <label htmlFor="All">All</label>
        <input type="radio" 
          id='Male'
          value='Male' 
          name='gender'
          onChange={e => setRadiodata(e.target.value)}
          checked={radioData === 'Male'} />
        <label htmlFor="Male">Male</label>
        <input type="radio" 
          id='Female' 
          value='Female'
          name='gender'
          onChange={e => setRadiodata(e.target.value)}
          checked={radioData === 'Female'} />
        <label htmlFor="Female">Female</label>
      </div>
      <div className='cardsList'>
          {users && 
            users.filter(item => {
              if(searchData.length === 0){
                return item
              } else {
                return item.name.toLowerCase().includes(searchData.toLowerCase())
              }
            })
            .filter(item => {
              if(radioData === 'Male'){
                return item.gender === radioData
              } else if(radioData === 'Female'){
                return item.gender === radioData
              } else {
                return item
              }
            })
            .map(item => {
              return (
                <div className='card' key={item.id}>
                  <div>{item.name}</div>
                  <div>{item.email}</div>
                  <div>{item.gender}</div>
                  <div className='links'>
                      <button onClick={() => {setId(item.id), setShowPopUp(true)}} className='btn'>View</button>
                      <Link to={`/edit/${item.id}`} className='btn'>Edit</Link>
                      <button onClick={() => dispatch(deleteUser(item.id))} className='btn'>Delete</button>
                  </div>
              </div>
              )
            })
          }
      </div>
    </div>
  )
}

export default Read