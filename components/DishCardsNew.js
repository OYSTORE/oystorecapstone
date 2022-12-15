import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RestaurantCard from "./RestaurantCard";
import { FaStar } from "react-icons/fa";

function DishCardsNew({ dish, handleAdd, handleRemove, dishID, carts }) {
    const [isBookmarked, setIsBookmarked] = useState();
    useEffect(()=> setIsBookmarked(Object.keys(carts).includes(dish.name + "-" + dish.served_by))
    ,[carts])
    // console.log(isBookmarked)
    // if (carts == dish.name+dish.served_by){
    //     setIsBookmarked(true)
    // }else{
    //     setIsBookmarked(false)
    // }

    //fixed rating
    let ratingArray = []
    Object.values(dish.reviewLists).map(review => ratingArray.push(review.rating))
    function average(a, n)
    {
    
        // Find sum of array element
        var sum = 0;
        for (var i = 0; i < n; i++) sum += a[i];

        return parseFloat(sum / n);
    }
    const reviews = ratingArray.length;
    const rating = Math.round(average(ratingArray, reviews) * 10) / 10;
    const [currentValueRatings, setCurrentValueRatings] = useState(rating);
    const counts = {};
    
    for (const num of ratingArray) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // const [currentValueFixed, setCurrentValueFixed] = useState(Math.floor(rating));
    const stars = Array(5).fill(0)
    return (
        <div className="flex flex-row sm:flex-col w-11/12 sm:w-56 h-48 sm:h-[22rem] rounded-none sm:rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:scale-105 my-2 bg-white">
            
        <div className="relative w-full sm:w-full h-48">
            <Image
                src={dish.dishimg || "/assets/dishpic/NoSrc.jpg"}
                    // src="/assets/dishpic/NoSrc.jpg"
                layout="fill"
                objectFit="cover"
                alt="..."
                className=" sm:rounded-t-xl"
                unoptimized
            />
        </div>
        <div className="flex flex-col  px-4 py-2 drop-shadow ">
            <a className="cursor-pointer">
                <h5 className="leading-tight text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                    {dish.name}
                </h5>   
                {/* <h6 className="text-xs">{isBookmarked.toString()}</h6> */}
                <Link href={"restaurants/" + dish.restaurantID}><h6 className="text-xs">{dish.served_by}</h6></Link>
                <span className="flex flex-row justify-between">
                    {/* <p className="text-sm">{dish.main_category}</p> */}
                    {/* <p className="text-sm">{dish.isAvailable ? "Available" : "Not Available"}</p> */}
                </span>
            </a>
            <div className="mt-0 mb-1 flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-center gap-1">
                       {stars.map((_, index) => {
                           return (
                               <FaStar
                                   key={index}
                                   size={10}
                                   color={(Math.floor(rating)) > index ? "#FF9F1C" : "#707070"}
                                  
                                   />
                               )
                               })}
                        <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                       {!rating ? 0 : rating}
                   </span>
                </div>
                <div className="flex flex-wrap justify-center items-center ">
                   
                   <span className="pl-2 text-sm text-center ">
                       {reviews == 0 ? reviews + " review" : reviews + " reviews" } 
                    </span>
                    
                </div>
                
            </div>
            <div className=" flex flex-row justify-center items-center">
                <p className="text-xs sm:text-sm sm:p-2 font-semibold">Php {dish.price}&nbsp;&nbsp;{dish.unit}</p>
                
            </div>
            <div className="w-full my-auto sm:my-2 p-1 flex flex-row items-center justify-center">
                <a
                    onClick={
                        !isBookmarked
                            ? () => {
                                  handleAdd(dish);
                                  setIsBookmarked(!isBookmarked);
                              }
                            : () => {
                                  handleRemove(dishID.toString());
                                  setIsBookmarked(!isBookmarked);
                              }
                    }
                    className={`select-none cursor-pointer rounded-lg px-2 sm:px-5 py-2.5 text-center 
                            text-sm font-medium text-white 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                !isBookmarked
                                    ? "bg-orange-peel hover:bg-[#fa812f]"
                                    : "bg-tiffany-blue"
                            } ease-in-out duration-300`}
                >
                    {!isBookmarked ? "Add to bookmarks" : "Bookmarked"}
                </a>
            
            </div>
        </div>
        
        </div>
    );
}

export default DishCardsNew;
