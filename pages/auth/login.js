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
    const [toggleModal, setToggleModal] = useState(false);
    const [toggleModal2, setToggleModal2] = useState(false);
    return (
        <>
            <div className="flex-1 flex flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-4 h-screen">
                <div className="hidden sm:block w-1/2 h-screen bg-center bg-cover bg-[url('/assets/oyster_banner2.jpg')]"></div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-2 shadow-xl p-10 text-gray-700 rounded-lg">
                        <div className="navbar-center">
                            {/* <Image
                                src="/assets/logo-oystore.png"
                                width="180"
                                height="46"
                                className="my-4 self-center"
                                alt="logo"
                            /> */}
                            <picture>
                                <source
                                 className="cursor-pointer"
                                srcSet="/assets/logo-oystore-dark.png"
                                media="(prefers-color-scheme: dark)"
                                />
                                <img
                                src='/assets/logo-oystore-light.png'
                                width='180'
                                height='46'
                                alt='Logo'
                                />
                            </picture>
                        </div>
                        {/* <h2 className="text-3xl font-medium"></h2> */}
                        <div className="py-4">
                            {/* <div className="flex flex-col gap-2">
                                <h1 className="text-lg text-center font-md text-slate-900 select-none uppercase dark:text-white">
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
                                    border-2 border-solid rounded-lg shadow-sm border-white focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600 "
                                    placeholder="Email Address"
                                />

                                <input
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="password"
                                    className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 
                                    border-2 border-solid rounded-lg shadow-sm border-white focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                    placeholder="Password"
                                />
                                <button
                                    onClick={submitHandler}
                                    className="py-2 text-slate-900 w-full border border-slate-900 border-solid uppercase duration-300
                        relative after:absolute after:top-0 after:right-full after:bg-orange-peel after:z-10 after:w-full after:h-full overflow-hidden dark:bg-blue-600
                        dark:after:bg-orange-peel
                        hover:after:translate-x-full after:duration-300 hover:text-white"
                                >
                                    <h2 className="relative z-20">SUBMIT</h2>
                                </button>
                                <h2
                                    className="select-none cursor-pointer "
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
                                    className="text-white bg-orange-peel dark:bg-blue-600 p-3 w-full font-medium rounded-lg flex items-center justify-center align-middle gap-2 "
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
                            <p className="leading-tight py-1">By signing up, you agree to the <b className="cursor-pointer" onClick={() => setToggleModal(!toggleModal)}>Terms and Conditions</b> and <b className="cursor-pointer" onClick={() => setToggleModal2(!toggleModal2)}>Privacy Policy</b> of the website.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`modal-add ${
                    toggleModal
                        ? "visible opacity-100 translate-y-20"
                        : "invisible opacity-0 -translate-y-28"
                }  overflow-y-auto h-[80vh] ease-in-out duration-300 z-10 w-4/5 lg:w-2/5 bg-white dark:bg-base-100 rounded-lg fixed top-0 left-0 right-0 mx-auto`}
            >
                <div className="p-2">
                    <div className="sticky top-0 bg-white dark:bg-base-100">
                        <p
                            onClick={() => setToggleModal(false) }
                            className=" text-right cursor-pointer font-semibold"
                        >
                            Close
                        </p>
                        <h1 className="text-lg text-center font-medium text-gray-700 dark:text-white">
                                Terms and Condition
                        </h1>
                    </div>
                    {/* <h1 className="px-3 py-2 text-lg font-semibold">Add New Dish</h1> */}
                    <div className="">
                        <div className="flex flex-col px-3">
                            
                            <p className="text-justify">
                                1. Introduction
                                These Website Standard Terms
                                 and Conditions written on this webpage shall manage your use of our website – OYSTORE: Online Food Menu Discovery for Talabahan Restaurants in Tambak, New Washington, Aklan.
                                <br/>              
                                2. By using our Website, you accepted these terms
                                 and conditions in full. If you disagree with these terms
                                 and conditions or any part of these terms
                                 and conditions, you must not use our Website.
                                 <br/>
                                3. Intellectual Property Rights <br />
                                Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.
                                <br/>
                                4. License to use website <br />
                                You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms
                                 and conditions.
                            <p/>
                                You must not:
                                <ul className="list-disc px-4">
                                    <li>republish material from this website (including republication on another website);</li>
                                    <li>sell, rent or sub-license material from the website;</li>
                                    <li>show any material from the website in public;</li>
                                    <li>reproduce, duplicate, copy or otherwise exploit material on our website for a commercial purpose;</li>
                                    <li>republish material from this website (including republication on another website);</li>
                                    <li>edit or otherwise modify any material on the website; or</li>
                                    <li>redistribute material from this website except for content specifically and expressly made available for redistribution.</li>
                        
                                </ul>
                                <br/>
                                
                                
                                Where content is specifically made available for redistribution, it may only be redistributed within your organisation.
                                <br />
                                5. Acceptable use <br />
                                You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
                                <br />
                                You must not use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.
                                <br />
                                You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction and data harvesting) on or in relation to our website without our express written consent.
                                <br />
                                You must not use our website to transmit or send unsolicited commercial communications.
                                <br />
                                You must not use our website for any purposes related to marketing without our express written consent.
                                <br />
                                6. Restricted access <br />
                                We reserve the right to restrict access to areas of our website, or indeed our whole website, at our discretion and without notice.
                                <br />
                                7. User account <br />
                                If you are provided with a user account and password to enable you to access restricted areas of our website or other content or services, you must ensure that the user account and password are kept confidential at all times.
                                <br />
                                We may disable your user account at any time in our sole discretion without notice or explanation.
                                <br />
                                8. User content <br />
                                In these terms
                                 and conditions, “your user content” means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to our website, for whatever purpose.
                                 <br />
                                You grant to us a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to us the right to sub-license these rights, and the right to bring an action for infringement of these rights.
                                <br />
                                Your user content must not be illegal or unlawful, must not infringe any third party’s legal rights, and must not be capable of giving rise to legal action whether against you or us or a third party (in each case under any applicable law).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`modal-add ${
                    toggleModal2
                        ? "visible opacity-100 translate-y-20"
                        : "invisible opacity-0 -translate-y-28"
                }  overflow-y-auto h-[80vh] ease-in-out duration-300 z-10 w-4/5 lg:w-2/5 bg-white dark:bg-base-100 rounded-lg fixed top-0 left-0 right-0 mx-auto`}
            >
                <div className="p-2">
                    <div className="sticky top-0 bg-white dark:bg-base-100">
                        <p
                            onClick={() => setToggleModal2(false) }
                            className=" text-right cursor-pointer font-semibold"
                        >
                            Close
                        </p>
                        <h1 className="text-lg text-center font-medium text-gray-700 dark:text-white">
                                Privacy Policy
                        </h1>
                    </div>
                    {/* <h1 className="px-3 py-2 text-lg font-semibold">Add New Dish</h1> */}
                    <div className="">
                        <div className="flex flex-col px-3 text-justify">
                            <p className="indent-5">
                            This privacy policy sets out how OYSTORE uses and protects any information that you give when you use this website.
                            </p>
                            <p className="indent-5">
                            OYSTORE is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. OYSTORE may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from December 2022. 
                            
                            </p><br/>
                            <h1 className="text-md font-semibold">
                            We may collect the following information:
                            
                            </h1>
                            
                            <ul className="list-disc px-4 dark:text-white">
                                    <li>name and job title</li>
                                    <li>contact information including email address</li>
                                    <li>demographic information such as postcode, preferences and interests</li>
                                    <li>other information relevant to customer surveys and/or offers</li>
                                    <li>republish material from this website (including republication on another website);</li>
                                    <li>edit or otherwise modify any material on the website; or</li>
                                    <li>redistribute material from this website except for content specifically and expressly made available for redistribution.</li>
                            
                            </ul><br/>
                            <h1 className="text-md font-semibold">
                                What we do with the information we gather
                            </h1>
                            <p className="indent-5">
                                We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                            </p>
                            <h1 className="text-md font-semibold indent-5">
                            Internal record keeping.
                            </h1>
                            <p className="px-4">
                            We may use the information to improve our products and/or services.
                            We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.
                            From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customize the website according to your interests.
                            </p>
                            <h1 className="text-md font-semibold indent-5">
                            Security.
                            </h1>
                            <p className="px-4">
                            We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                            </p>
                            <h1 className="text-md font-semibold">
                            How we use cookies
                            </h1>
                            <p className="indent-5">
                                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyses web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
                                We use traffic log cookies to identify which pages are being used. This helps us analyses data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
                                Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
                                You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
                                Links to other websites
                                Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.
                                Controlling your personal information
                                You may choose to restrict the collection or use of your personal information in the following ways:
                                whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes
                                if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us
                                We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.
                                You may request details of personal information which we hold about you. A small fee will be payable. If you would like a copy of the information held on you, please contact us.
                                If you believe that any information we are holding on you is incorrect or incomplete, contact us as soon as possible. We will promptly correct any information found to be incorrect.
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
