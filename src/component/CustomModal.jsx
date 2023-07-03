import React from 'react'
import { useSelector } from 'react-redux'

const CustomModal = ({id, setShowPopUp}) => {
    const allUsers = useSelector((state) => (state.app.users))
    const singleUser = allUsers.filter(item => item.id === id)

    return (
    <div className='modalBackground'>
        <div className="modalContainer">
            <button className='close' onClick={() => setShowPopUp(false)}>X</button>
            <h3>Name: {singleUser[0].name}</h3>
            <h3>Email: {singleUser[0].email}</h3>
            <h3>Age: {singleUser[0].age}</h3>
            <h3>Gender: {singleUser[0].gender}</h3>
        </div>
    </div>
  )
}

export default CustomModal