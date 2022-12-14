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
import UserReservationsCard from "../components/UserReservationsCard";



const Reservations = () => {
    useEffect(() => {
        !currentUser ? Router.push("/") : ""
    },[currentUser])
    const {reservations} = useFetchReservations();
    
    const { currentUser } = useAuth();
    
    //reservations
    const handleAcceptReservation = async(res, reservationKey) => {
        const userRef = doc(db, "users", res.userID);
        const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        await setDoc(
            userRef,
            {
                reservations: {
                    [reservationKey]: {
                        reservationStatus:"Confirmed",
                    },
                },
            },
            { merge: true }
        );
        await setDoc(
            restaurantRef,
            {
                reservations: {
                    [reservationKey]: {
                        reservationStatus:"Confirmed",
                    },
                },
            },
            { merge: true }
        );
      }
    
    return (
        <>
        {currentUser ? 
           (<>
            <Navbar2 />
                <div className="flex flex-col w-11/12 my-10 mx-auto min-h-screen">
                    <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">My Reservations</h1>
                        <div className="flex items-center justify-around gap-2 flex-wrap w-full mt-3 ">
                            {Object.entries(reservations).map((reservation, index) =>
                                    typeof menuData == null ? (
                                        ""
                                    ) : (
                                        <UserReservationsCard
                                            key={reservation[0]}
                                            dish={reservation[1]}
                                            
                                            dishID={reservation[0]}
                                        />
                                    )
                                )}
                        </div>
                </div>
            <Footer className="sticky bottom-0" /></>): "" }
        </>
    );
}
 
export default Reservations;