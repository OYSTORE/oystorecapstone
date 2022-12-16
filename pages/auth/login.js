import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiFillTwitterCircle } from "react-icons/ai";
import {
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    updateProfile,
    signInWithRedirect,
    TwitterAuthProvider,
} from "firebase/auth";

// import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

import { useAuth } from "../../context/AuthContext";
import Router  from "next/router";
import Image from "next/image";

export default function Login() {
    
    const [user, loading] = useAuthState(auth);
    //Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            Router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    // const fbProvider = new FacebookAuthProvider();
    // const FacebookProvider = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, fbProvider);
    //         const credantial = await FacebookAuthProvider.credentialFromResult(
    //             result
    //         );
    //         const token = credantial.accessToken;
    //         let photoUrl =
    //             result.user.photoURL + "?height=500&access_token=" + token;
    //         await updateProfile(auth.currentUser, { photoURL: photoUrl });
    //         route.push("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const twitterProvider = new TwitterAuthProvider();
    // const TwitterLogin = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, twitterProvider);
    //         route.push("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        if (user) {
            Router.push("/");
        } else {
            // console.log("login");
        }
    }, [user]);
    //old login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, signup, currentUser } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [error, setError] = useState(null);

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
        <>
            <div className="flex-1 flex flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-4 h-screen">
                <div className="hidden sm:block w-1/2 h-screen bg-center bg-cover bg-[url('/assets/oyster_banner2.jpg')]"></div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-2 shadow-xl p-10 text-gray-700 rounded-lg">
                        <div className="navbar-center">
                            <Image
                                src="/assets/logo-oystore.png"
                                width="180"
                                height="46"
                                className="my-4 self-center"
                                alt="logo"
                            />
                        </div>
                        {/* <h2 className="text-3xl font-medium"></h2> */}
                        <div className="py-4">
                            {/* <div className="flex flex-col gap-2">
                                <h1 className="text-lg text-center font-md text-slate-900 select-none uppercase">
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 
                                    border-2 border-solid border-slate-900 focus:border-orange-300"
                                    placeholder="Password"
                                />
                                <button
                                    onClick={submitHandler}
                                    className="py-2 text-slate-900 w-full border border-slate-900 border-solid uppercase duration-300
                        relative after:absolute after:top-0 after:right-full after:bg-slate-900 after:z-10 after:w-full after:h-full overflow-hidden 
                        hover:after:translate-x-full after:duration-300 hover:text-white"
                                >
                                    <h2 className="relative z-20">SUBMIT</h2>
                                </button>
                                <h2
                                    className="select-none cursor-pointer"
                                    onClick={() => setIsLoggingIn(!isLoggingIn)}
                                >
                                    {!isLoggingIn ? "Login" : "Register"}{" "}
                                </h2>
                            </div> */}
                            {/* <h3 className="py-4">
                                Sign in with one of the providers
                            </h3> */}
                            <div className="flex flex-col gap-4 items-center justify-center ">
                                <button
                                    onClick={GoogleLogin}
                                    className="text-white bg-orange-peel p-3 w-full font-medium rounded-lg flex items-center justify-center align-middle gap-2 "
                                >
                                    <FcGoogle className="text-2xl bg-white" />
                                    Sign in with Google
                                </button>
                                {/* <button
                                    className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
                                    onClick={FacebookProvider}
                                >
                                    <AiFillFacebook className="text-2xl text-blue-300" />
                                    Sign in with Facebook
                                </button> */}
                                {/* <button
                        className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
                        onClick={TwitterLogin}
                      >
                        <AiFillTwitterCircle className="text-2xl text-[#1DA1F2]" />
                        Sign in with Twitter
                      </button> */}
                            </div>
                            <p className="leading-tight py-1">By signing up, you agree to the Terms of Service and Privacy Policy of the website.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
