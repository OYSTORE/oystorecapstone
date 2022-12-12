import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RestaurantCard from "./RestaurantCard";
import { FaStar } from "react-icons/fa";

function DishCards({ dish, handleAdd, handleRemove, dishID, carts }) {
    const [isBookmarked, setIsBookmarked] = useState(
        ()=>Object.keys(carts).includes(dishID)
    );
    
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
    const [currentValueFixed, setCurrentValueFixed] = useState(rating);
    const stars = Array(5).fill(0)
    return (
        <div className="snap-start flex flex-col w-56 h-80 rounded-xl shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-4 border my-2 bg-white">
            {/* <Card
                imgAlt="{restaurant.name}"
                imgSrc={"/assets/restaurants/"+restaurant.src} className=" cursor-pointer "
            > */}

            {/*<div className="w-[200px] h-[200px] bg-fixed" style={dishbg} >daoishdoashodhao</div>*/}
            <div className="relative w-full h-40 rounded-t-xl">
                <Image
                    src={dish.dishimg}
                    layout="fill"
                    objectFit="cover"
                    alt="..."
                    className="rounded-t-xl"
                    unoptimized
                />
            </div>
            <div className="flex flex-row flex-wrap px-4 py-2 drop-shadow">
                <a href="#">
                    <h5 className="leading-tight text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                        {dish.name}
                    </h5>
                    {/* <h6 className="text-xs">{isBookmarked.toString()}</h6> */}
                    <Link href={"restaurants/" + dish.restaurantID}><h6 className="text-xs">{dish.served_by}</h6></Link>
                </a>
                <div className="mt-0 mb-1 flex items-center">
                
                           
                           <div className="flex flex-row items-center justify-center">
                               {stars.map((_, index) => {
                                   return (
                                       <FaStar
                                           key={index}
                                           size={10}
                                           color={(currentValueRatings) > index ? "#FF9F1C" : "#707070"}
                                           style={{
                                               marginRight: 6,
                                           }}
                                           />
                                       )
                                       })}
                                       
                           </div>
                           <div className="mt-0 mb-1 flex items-center">
                               
                               <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                   {!rating ? 0 : rating}
                               </span>
                               <span className="pl-2 text-sm ">
                                   {reviews} reviews
                                </span>
                           </div>
                           
                   
                </div>
            </div>
            <div className="mt-auto px-4 py-2 flex items-center justify-between">
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
                    className={`select-none cursor-pointer rounded-lg px-5 py-2.5 text-center 
                            text-sm font-medium text-white 
                            focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                !isBookmarked
                                    ? "bg-orange-peel hover:bg-[#fa812f]"
                                    : "bg-tiffany-blue"
                            } ease-in-out duration-300`}
                >
                    {!isBookmarked ? "Add to bookmarks" : "Added to bookmarks"}
                </a>
                
            </div>
        </div>
    );
}

export default DishCards;
