import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RestaurantCard from "./RestaurantCard";
import { FaStar } from "react-icons/fa";

function UserReservationsCard({
    dish,
    handleAdd,
    handleRemove,
    dishID,
    carts,
    handleAcceptReservation,
    handleDenyReservation,
}) {
    //fixed rating

    return (
        <div className="dark:bg-slate-800 flex flex-row sm:flex-col w-11/12 sm:w-60 border rounded-none sm:rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:scale-105 my-2 bg-white justify-center items-center">
            <div className="w-full flex justify-between items-center ">
                <div className="relative w-full h-60 sm:h-40 sm:w-full overflow-hidden rounded-none sm:rounded-xl ">
                    <Image
                        // src={dish.dishimg}
                        src={dish.userProfilePic ? dish.userProfilePic: "/assets/dishpic/NoSrc.jpg"}
                        layout="fill"
                        objectFit="cover"
                        alt="..."
                        className=""
                        unoptimized
                    />
                </div>
            </div>
            <div className="flex flex-col  px-4 py-2 drop-shadow ">
               
                    <p className="leading-tight text-md text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                        {dish.nameReservation}
                    </p>
              
                    {/* <h6 className="text-xs">{isBookmarked.toString()}</h6> */}
                    {/* <Link href={"restaurants/" + dish.restaurantID}><h6 className="text-xs">{dish.served_by}</h6></Link> */}
                    <div className="flex flex-wrap justify-center items-center ">
                        <p className="text-sm font-semibold">
                            Party size: {dish.partySize}
                        </p>
                    </div>
                
                <div className="mt-0 mb-1 flex flex-row justify-around items-center gap-2">
                    <div className="flex flex-wrap justify-center items-center">
                        
                            <p className="text-sm font-semibold cursor-pointer">
                                Date: <br />
                                {dish.dateReservation}
                            </p>
                        
                    </div>
                    <div className="flex flex-wrap justify-center items-center">
                        <p className="text-sm font-semibold ">
                            Time: <br />
                            {dish.timeReservation}
                        </p>
                    </div>
                </div>
                {/* <div className=" flex flex-col justify-center items-center">
                    <p className="text-xs sm:text-sm font-semibold">
                        {dish.userEmail}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold">
                        {dish.contactReservation}
                    </p>
                </div> */}
                <div className=" flex flex-col justify-center items-center">
                    <Link href={"restaurants/" + dish.restaurantID}>
                        <p className="text-xs sm:text-sm font-semibold text-center cursor-pointer">
                            {dish.reservationTo}
                        </p>
                    </Link>
                    <p className="text-xs sm:text-sm font-semibold text-center">
                        Restaurant No: 0{dish.restaurantNo}
                    </p>
                </div>
                <div className="w-full my-auto sm:my-2 p-1 flex flex-row items-center justify-around">
                    
                            {dish.reservationStatus == "Confirmed" ? (
                                <p className="text-xs sm:text-sm font-semibold  text-green-600">
                                    {dish.reservationStatus}
                                </p>
                            ) : (
                                <p className="text-xs sm:text-sm font-semibold text-red-600">
                                    {dish.reservationStatus}
                                </p>
                            )}
                </div>
            </div>
        </div>
    );
}

export default UserReservationsCard;
