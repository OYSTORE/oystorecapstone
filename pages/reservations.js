import { collection, deleteDoc, deleteField, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Cart } from ".";
import CartCards from "../components/CartCards";

import useFetchCarts from "../hooks/fetchCart";
import Navbar2 from "../components/Navbar2";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Router from "next/router";

import BookmarkCard from "../components/BookmarkCard";
import useFetchReservations from "../hooks/fetchReservations";



const Reservations = () => {
    useEffect(() => {
        !currentUser ? Router.push("/") : ""
    },[currentUser])
    const {Reservations} = useFetchReservations();
    
    const { currentUser } = useAuth()
    return (
        <>
        {currentUser ? 
           (<>
            <Navbar2 />
                <div className="flex flex-col w-11/12 my-10 mx-auto min-h-screen">
                    <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">My Reservations</h1>
                    <div className="flex items-center justify-center mb-3 flex-wrap w-full gap-4">

                    </div>
                </div>
            <Footer className="sticky bottom-0" /></>): "" }
        </>
    );
}
 
export default Reservations;