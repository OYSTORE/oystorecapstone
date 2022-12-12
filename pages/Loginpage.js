import { FirebaseError } from 'firebase/app'
import Image from 'next/image';
import React, { useState } from 'react'
import Login from '../components/Login'
import { useAuth } from '../context/AuthContext';

export default function Loginpage() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const { login, signup, currentUser } = useAuth();

    
    async function submitHandler() {
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        if (isLoggingIn) {
            try {
                await login(email, password);
            } catch (err) {
                setError("Incorrect email or password");
            }
            return;
        }
        await signup(email, password);
    }
  return (
   
       <div className='flex flex-col min-h-screen relative'>
        <div className="flex-1 flex flex-row justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4 h-screen">
            <div className="hidden sm:block w-[55%] h-screen bg-center bg-cover bg-[url('/assets/oyster_banner2.jpg')]"></div>
            <div className="flex-1 flex flex-col justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4 mr-0 sm:mr-4">
                <Image
                    src="/assets/logo-oystore.png"
                    width="200"
                    height="51"
                    className="my-4"
                />

                <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 select-none uppercase">
                    {isLoggingIn ? "Login" : "Register"}
                </h1>
                {error && (
                    <div className="w-full max-w-[40ch] border-red-600 text-red-600">
                        {error}
                    </div>
                )}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 
        border-2 border-solid border-slate-900 focus:border-orange-300"
                    placeholder="Email Address"
                />

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 
        border-2 border-solid border-slate-900 focus:border-orange-300"
                    placeholder="Password"
                />
                <button
                    onClick={submitHandler}
                    className="py-2 text-slate-900 w-full max-w-[40ch] border border-slate-900 border-solid uppercase duration-300
        relative after:absolute after:top-0 after:right-full after:bg-slate-900 after:z-10 after:w-full after:h-full overflow-hidden 
        hover:after:translate-x-full after:duration-300 hover:text-white"
                >
                    <h2 className="relative z-20">SUBMIT</h2>
                </button>
                <h2
                    className="duration-300 hover:scale-110 select-none cursor-pointer"
                    onClick={() => setIsLoggingIn(!isLoggingIn)}
                >
                    {!isLoggingIn ? "Login" : "Register"}{" "}
                </h2>
            </div>
        </div>
       </div>
   
  )
}
