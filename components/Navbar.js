import Image from "next/image";
import Search from "./Search";
import { AiOutlineHeart, AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import Link from "next/link";


const Navbar = () => {
    return ( 
        <header className="sticky border-b-2  top-0 z-10">
            <nav className="w-screen py-4 px-0">
                <div className="container flex flex-col flex-wrap mx-[auto] justify-center md:justify-around items-center px-[.75rem]
                space-x-10 
                ">
                    <div className="logo mr-11 flex justify-center items-center pr-5 cursor-pointer m-0 p-0">
                        <Link href='/'><a className="pt-1"><Image src='/assets/logo-oystore.png' width='200' height='51' alt="" layout="fixed" priority /></a></Link>
                        
                    </div>
                    <div className="searchBar">
                        <Search />
                    </div>
                    <ul className="menu flex flex-row items-end text-gray-700 ">
                        <li className="text-xs pr-3 cursor-pointer">
                            <Link href='/bookmarks'>
                                <a><span className="flex flex-row items-center pl-2">
                                    <AiOutlineHeart  size={42} className='pr-1'/> <p className='hidden lg:block'>Bookmarks</p>
                                </span></a>
                            </Link>
                        </li>
                            
                        <li className="text-xs pr-3 cursor-pointer">
                            <Link href='/reservations'>
                                <a><span className="flex flex-row items-center pl-2">
                                    <AiOutlineCalendar  size={42} className='pr-1'/> <p className='hidden lg:block'>Reservation</p>
                                </span></a>
                            </Link>
                        </li>
                           
                        <li className="text-xs pr-3 cursor-pointer">
                            <Link href='/account'>
                                <a><span className="flex flex-row items-center pl-2">
                                    <MdOutlineAccountCircle  size={42} className='pr-1'/> <p className='hidden lg:block'>Account</p>
                                </span></a>
                            </Link>
                        </li>
                            
                    </ul>
                </div>
            </nav>
        </header>
     );
}
 
export default Navbar;