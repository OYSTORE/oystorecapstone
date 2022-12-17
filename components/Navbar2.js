import Link from "next/link";
import Image from "next/image";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import useFetchCarts from "../hooks/fetchCart";
import SideNav from "./SideNav";
import { AiOutlineMenu, AiFillHome, AiFillSetting } from "react-icons/ai";
import { GiChickenOven } from "react-icons/gi";
import { MdOutlineRestaurant, MdBookmarks } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaCalendarCheck } from "react-icons/fa";
import useFetchOwnerRestaurant from "../hooks/fetchOwnerRestaurant";
import useFetchUserData from "../hooks/fetchUserData";
import useFetchUserType from "../hooks/fetchUserType";

const Navbar2 = () => {
    {
        /*const [dishes, setDishes] = useState([]);
    
      const [myCart, setCart] = useState([]);
      useEffect(() => {
        const collectionRef = collection(db, "Dishes");
        const q = query(collectionRef, orderBy("ratings", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) =>{
            setDishes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
            })))
            
        });
        return unsubscribe;
  
    }, []);
    const [mycarts, setMyCarts] = useState([]);
    useEffect(() => {
      const collectionRef = collection(db, "Cart");
      const q = query(collectionRef);
      const unsubscribe = onSnapshot(q, (querySnapshot) =>{
          setCart(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
          })))
      });
      return unsubscribe;
  
    }, []);
    useEffect(() => {
      const collectionRef2 = doc(db, "users", currentUser.uid);
      const q = query(collectionRef2);
      const unsubscribe = onSnapshot(q, (querySnapshot) =>{
        setMyCarts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
          })))
      });
      return unsubscribe;
  
    }, []);*/
    }

    const { logout } = useAuth();
    const handleRedirect = (e) => {
        e.preventDefault();
        logout();
        Router.push("/auth/login");
    };
    const { currentUser } = useAuth();
    const { ownerStatus, adminStatus } = useFetchUserType();
    // console.log(currentUser.uid);
    //fetch carts
    // const { carts, loading, error, setCarts } = useFetchCarts();
    //console.log(Object.values(carts[1].name))
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <div
                className={`bg-white h-full w-[60] fixed top-0 left-0 z-40 flex flex-col
          ${
              isOpen ? "translate-x-0" : "-translate-x-full"
          } ease-in-out duration-300`}
            >
                <div className="flex flex-row justify-start items-center gap-3 px-6 py-[0.64rem] border-b">
                    <AiOutlineMenu
                        className="cursor-pointer"
                        size="1.8em"
                        onClick={() => setOpen(!isOpen)}
                    />
                    <Link href="/">
                        <>
                            <Image
                                className="cursor-pointer"
                                src="/assets/logo-oystore-light.png"
                                width="180"
                                height="46"
                                layout="fixed"
                                alt="logo"
                                priority
                                referrerPolicy="no-referrer" 
                            />
                        </>
                    </Link>
                </div>
                <div className="mt-2">
                    <ul>
                        <Link href="/">
                            <li
                                onClick={() => setOpen(false)}
                                className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                            >
                                <AiFillHome
                                    size="1.8em"
                                    className="text-gray-700 group-hover:text-white"
                                />
                                <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                    Home
                                </h3>
                            </li>
                        </Link>
                        <Link href="/dishespage">
                            <li
                                onClick={() => setOpen(false)}
                                className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                            >
                                <GiChickenOven
                                    size="1.8em"
                                    className="text-gray-700 group-hover:text-white"
                                />
                                <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                    Dishes
                                </h3>
                            </li>
                        </Link>
                        <Link href="/restaurantspage">
                            <li
                                onClick={() => setOpen(false)}
                                className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                            >
                                <MdOutlineRestaurant
                                    size="1.8em"
                                    className="text-gray-700 group-hover:text-white"
                                />
                                <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                    Restaurants
                                </h3>
                            </li>
                        </Link>
                        <Link href="/bookmarks">
                            <li
                                onClick={() => setOpen(false)}
                                className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                            >
                                <MdBookmarks
                                    size="1.8em"
                                    className="text-gray-700 group-hover:text-white"
                                />
                                <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                    Bookmarks
                                </h3>
                            </li>
                        </Link>
                        <Link href="/reservations">
                            <li
                                onClick={() => setOpen(false)}
                                className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                            >
                                <FaCalendarCheck
                                    size="1.8em"
                                    className="text-gray-700 group-hover:text-white"
                                />
                                <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                    Reservations
                                </h3>
                            </li>
                        </Link>
                        {ownerStatus && (
                            <Link href="/ownerpage">
                                <li
                                    onClick={() => setOpen(false)}
                                    className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                                >
                                    <RiAdminFill
                                        size="1.8em"
                                        className="text-gray-700 group-hover:text-white"
                                    />
                                    <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                        Owner&apos;s Dashboard
                                    </h3>
                                </li>
                            </Link>
                        )}
                        {adminStatus && (
                            <Link href="/adminpage">
                                <li
                                    onClick={() => setOpen(false)}
                                    className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                                >
                                    <RiAdminFill
                                        size="1.8em"
                                        className="text-gray-700 group-hover:text-white"
                                    />
                                    <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                        Admin Dashboard
                                    </h3>
                                </li>
                            </Link>
                        )}
                        {/* <Link href="/">
                            <li
                                onClick={() => setOpen(false)}
                                className="group border-box px-6 py-3 flex flex-row items-center gap-5 hover:bg-orange-peel cursor-pointer"
                            >
                                <AiFillSetting
                                    size="1.8em"
                                    className="text-gray-700 group-hover:text-white"
                                />
                                <h3 className=" text-gray-700 text-base font-medium   group-hover:text-white">
                                    Settings
                                </h3>
                            </li>
                        </Link> */}
                    </ul>
                </div>
            </div>

            <div
                className={`${
                    isOpen ? "opacity-70 visible" : "invisible opacity-20"
                }  ease-in-out top-0 left-0 bg-black h-full fixed w-full z-30 duration-300 transition-opacity`}
                onClick={() => setOpen(!isOpen)}
            ></div>

            <div className="navbar bg-base-100 shadow-sm sticky top-0 z-20">
                <div className="navbar-start">
                    <AiOutlineMenu
                        className="cursor-pointer ml-4"
                        tabIndex={0}
                        size="1.8em"
                        onClick={() => setOpen(!isOpen)}
                    />
                    {/* <div className="dropdown">
                <label onClick = {() => setOpen(!isOpen)} tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                  </label>
                
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                  <li><Link href="/"><a>Homepage</a></Link></li>
                  <li><a>About</a></li>
                  <li><a>Discover</a></li>
                  <li><a>Owner's Page</a></li>
                  <li><a>Reservations</a></li>
                </ul>
                
              </div>
              */}
                </div>
                <Link href="/">
                    <div className="navbar-center cursor-pointer">
                        <Image
                            src="/assets/logo-oystore-light.png"
                            width="180"
                            height="46"
                            layout="fixed"
                            alt="logo"
                            priority
                        />
                    </div>
                </Link>
                <div className="navbar-end">
                    {/* <button className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
                    </button> */}
                    <div className="flex-none">
                        {/* <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item">
                                    {Object.keys(carts).length}
                                </span>
                            </div>
                        </label>
                        <div
                            tabIndex={0}
                            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                            <div className="card-body">
                                <span className="font-bold text-lg">
                                    {Object.keys(carts).length} Items
                                </span>
                                <span className="text-info">Subtotal: Php {subTotalCart}</span>
                                <div className="card-actions">
                                    <Link href="/cartPage">
                                        <button className="btn btn-primary btn-block">
                                            View cart
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div> */}
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        
                                        src={
                                            currentUser.photoURL
                                                ? currentUser.photoURL
                                                : "/assets/dishpic/NoSrc.jpg"
                                        }
                                        alt="Profile"
                                        // 
                                    />
                                    {/* <img src="/assets/dishpic/NoSrc.jpg" alt="Profile"/> */}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40"
                            >
                                {/* <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li> */}
                                <li onClick={handleRedirect}>
                                    <a>Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar2;
