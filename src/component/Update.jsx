import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../features/userDetailSlice'

const Update = () => {
    const {id} = useParams()
    const {users, loading} = useSelector((state) => (state.app))
    const [updateData, setUpdateData] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(id){
            const editUser = users.filter(item => item.id === id)
            setUpdateData(editUser[0])
        }
    },[])

    const newData = (e) => {
        setUpdateData(prevData => (
            {...prevData,
            [e.target.name]: e.target.value}
        ))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUser(updateData))
        navigate('/read')
    }

  return (
    <div>
        <h2 className='head'>Edit the data</h2>
            {updateData && <form className='form' onSubmit={handleUpdate}>
                <div className='formElements'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                        id='name' 
                        name='name' 
                        required 
                        value={updateData.name}
                        onChange={newData}/>
                </div>
                <div className='formElements'>
                    <label htmlFor="email">Email: </label>
                    <input type='email' 
                        id='email' 
                        name='email' 
                        required 
                        value={updateData.email}
                        onChange={newData}/>
                </div>
                <div className='formElements'>
                    <label htmlFor="age">Age: </label>
                    <input type='number' 
                        id='age' 
                        name='age' 
                        required 
                        value={updateData.age}
                        onChange={newData}/>
                </div>
                <div className="gender">
                    <label htmlFor="male">Male:</label>
                    <input type='radio' 
                        id='male' 
                        name='gender'
                        value='Male' 
                        required 
                        checked={updateData.gender === 'Male'}
                        onChange={newData}/>
                    <br />
                    <label htmlFor="female">Female:</label>
                    <input type='radio' 
                        id='female' 
                        name='gender' 
                        value='Female' 
                        required 
                        checked={updateData.gender === 'Female'}
                        onChange={newData}/>
                </div>
                <button>Submit</button>
            </form>}
    </div>
  )
}

export default Update