import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../features/userDetailSlice'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [users, setUsers] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserData = (e) =>{
        setUsers(prevUsers => (
            {...prevUsers, 
            [e.target.name] : e.target.value}
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createUser(users))
        navigate('/read')
    }

    return (
        <>
            <h2 className='head'>Fill the data</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className='formElements'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                        id='name' 
                        name='name' 
                        onChange={getUserData} 
                        required/>
                </div>
                <div className='formElements'>
                    <label htmlFor="email">Email: </label>
                    <input type='email' 
                        id='email' 
                        name='email' 
                        onChange={getUserData} 
                        required/>
                </div>
                <div className='formElements'>
                    <label htmlFor="age">Age: </label>
                    <input type='number' 
                        id='age' 
                        name='age' 
                        onChange={getUserData} 
                        required/>
                </div>
                <div className="gender">
                    <label htmlFor="male">Male:</label>
                    <input type='radio' 
                        id='male' 
                        name='gender' 
                        value='Male' 
                        onChange={getUserData} 
                        required/>
                    <br />
                    <label htmlFor="female">Female:</label>
                    <input type='radio' 
                        id='female' 
                        name='gender' 
                        value='Female' 
                        onChange={getUserData} 
                        required/>
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Create