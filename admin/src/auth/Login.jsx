import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../utils/api';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault();
        // console.log(email);
        // console.log(password);

        // alert("Login submitted ")



        if (!email || !password) {
            toast.error("Please fill all the fields")
            return;

        }

        try {

            const res = await authAPI.login({ email, password })

            localStorage.setItem("token", res.data.token)

            toast.success("Login successful")

            setTimeout(() => {
                navigate("/dashboard")
            }, 3000)

        } catch (error) {

            console.log(error);
            
            if (error.response?.status === 401 || error.response?.data?.message?.includes('password')) {
                toast.error("Invalid email or password")
            } else {
                toast.error("Login failed")
            }
            return;

        }


    }



    return (
        <>

            <div className='max-w-7xl mx-auto'>

                <div className='bg-[#dacfcf] shadow-lg items-center justify-center align-middle text-center py-10 my-15'>

                    <h1>
                        Login
                    </h1>

                    <div className=' bg-[#c3bfbf] shadow-xl lg:max-w-lg mx-auto py-10 my-30 shadow-slate-400 '>

                        <form onSubmit={handlesubmit} className='max-w-80 mx-auto '>

                            <input type="email" placeholder='enter your email'
                                className='bg-gray-200 text-black my-2 p-1 rounded'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />

                            <br />

                            <input type="password" name="" id="" placeholder='enter your password'
                                className='bg-gray-200 my-2 p-1 rounded'
                                value={password}

                                onChange={(e) => setPassword(e.target.value)}


                            />

                            <br />

                            <button className='bg-blue-200 w-45 rounded p-1 my-6'
                                type='submit'
                            >
                                Login
                            </button>
                        </form>

                    </div>



                </div>






















            </div>

        </>
    )
}

export default Login
