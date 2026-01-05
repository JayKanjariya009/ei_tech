import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authAPI } from '../utils/api'

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate()

    const handlechange = async (e) => {
        e.preventDefault()

        if (!name || !email || !password || !role) {
            toast.error("Please fill all the fields")
            return
        }

        try {
            const res = await authAPI.register({ name, email, password, role })
            toast.success("Registration successful")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error) {
            console.log(error)
            toast.error("Registration failed")
        }
    }


    return (
        <>
            <div className='max-w-7xl mx-auto'>



                <div className='max-w-lg mx-auto bg-[#f1f1f1] p-5 my-15 items-center text-center rounded'  >

                    <h1 className='text-3xl font-bold my-5'>
                        Register
                    </h1>

                    <form onSubmit={handlechange} className='bg-[#dad6d6]  rounded shadow-lg py-8  my-5 '>

                        <input type="text" placeholder='enter your name'
                            className='bg-gray-200 text-black my-2 p-1 rounded '
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <br />

                        <input type="email" placeholder='enter your email'
                            className='bg-gray-200 text-black my-2 p-1 rounded '
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <br />

                        <input type="password" placeholder='enter your password'
                            className='bg-gray-200 text-black my-2 p-1 rounded'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <br />

                        <select className='bg-gray-200 my-2 p-1 rounded' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>


                        <br />

                        <button type='submit'
                            className='bg-blue-500 my-2 p-1 w-50 rounded '
                        >
                            Register
                        </button>



                    </form>
                </div>

            </div>




        </>
    )
}

export default Register
