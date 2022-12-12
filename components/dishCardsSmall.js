import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RestaurantCard from "./RestaurantCard";
import { FaStar } from "react-icons/fa";

function DishCardsSmall({ dish, handleAdd, handleRemove, dishID, dishIDArray, carts, handleSubmit, reviewerID}) {
    const [isBookmarked, setIsBookmarked] = useState(() =>
        Object.keys(carts).includes(dishID)
    );

    // if (carts == dish.name+dish.served_by){
    //     setIsBookmarked(true)
    // }else{
    //     setIsBookmarked(false)
    // }
    //star rating
    // !dish.reviewLists ? "" : Object.entries(dish.reviewLists).filter(rev => rev[0] == reviewerID).map(review => {() => setCurrentValue(review[1].rating)})
    let dishInitialStars = 1;
    Object.entries(dish.reviewLists).filter(rev => rev[0] == reviewerID).map(review =>  dishInitialStars = review[1].rating)
    const [currentValue, setCurrentValue] = useState(dishInitialStars);
    // console.log(JSON.stringify(dish.reviewLists[reviewerID].rating))
    
    const [hoverValue, setHoverValue] = useState(1);
    const stars = Array(5).fill(0);
    const handleClick = value => {
        if (value == 0 ) {
            setCurrentValue(1)
        }else{
            setCurrentValue(value)
        }
        setToggleSubmit(true)
    }

    const handleMouseOver = newHoverValue => {
        if (newHoverValue == 0 ) {
            setHoverValue(1)
        }else{
            setHoverValue(newHoverValue)
        }
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    //submit
    const [toggleSubmit, setToggleSubmit] = useState(false);
    
    // fixed rating
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
    return (
        <div className="snap-start flex flex-row  w-full lg:w-3/4 h-40 rounded-xl shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-2 border my-2 bg-white">
            {/* <Card
                imgAlt="{restaurant.name}"
                imgSrc={"/assets/restaurants/"+restaurant.src} className=" cursor-pointer "
            > */}

            {/*<div className="w-[200px] h-[200px] bg-fixed" style={dishbg} >daoishdoashodhao</div>*/}
            <div className="relative w-2/5 lg:w-80 rounded-xl bg-red-500">
                <Image
                    src={dish.dishimg}
                    layout="fill"
                    objectFit="cover"
                    alt="..."
                    className="rounded-l-lg"
                    unoptimized
                />
            </div>
            <div className="flex flex-col md:flex-row">
                <div className=" flex flex-row flex-wrap px-4 py-4 drop-shadow justify-start items-center">
                    <a href="#">
                        <h5 className=" leading-tight text-xs md:text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                            {dish.name}
                        </h5>
                        
                        {/* <h6 className="text-xs">{isBookmarked.toString()}</h6> */}
                        <h6 className="text-xs">{dish.served_by}</h6>
                    </a>
                    <div className="flex flex-row items-center justify-center gap-2">
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={15}
                                        color={
                                            (Math.floor(rating)) > index + 1
                                                ? "#FF9F1C"
                                                : "#707070"
                                        }
                                       
                                    />
                                );
                            })}
                    </div>
                    <div className="px-2 flex items-center">    
                        <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                            {!rating ? 0 : rating}
                        </span>
                        <span className="ml-2 text-sm ">
                        {reviews} reviews
                        </span>
                    </div>
                   
                </div>
                <div className="flex-row md:flex-col px-4 flex items-center justify-center gap-4">
                    <div className="flex flex-col justify-center">
                        <p className="text-xs md:text-sm text-center">Rate This Dish</p>
                        <div className="flex flex-row items-center justify-center gap-2">
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={15}
                                        onClick={() => {
                                            handleClick(index + 1);
                                        }}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color={
                                            (currentValue) > index 
                                                ? "#FF9F1C"
                                                : "#707070"
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <button className={`${toggleSubmit ? "visible" : "invisible"} btn btn-ghost btn-xs mt-2 text-xs md:text-sm text-center hover:text-white hover:bg-orange-peel`} 
                        onClick={() => {setToggleSubmit(!toggleSubmit), handleSubmit(dish, dishIDArray, currentValue)}} >Submit</button>
                    </div>
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
                        className={`select-none cursor-pointer rounded-lg px-3 py-2.5 text-center 
                                text-xs font-medium text-white 
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
        </div>
    );
}

export default DishCardsSmall;
