import { Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RestaurantCard = ({ restaurant }) => {
    let ratingArray = []
    Object.values(restaurant.reviewLists).map(review => ratingArray.push(review.rating))
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
    const stars = Array(5).fill(0)
    return (
        <div className=" mx-2 flex flex-col w-60 rounded-xl shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-4 border my-3">
            {/* <Card
                imgAlt="{restaurant.name}"
                imgSrc={"/assets/restaurants/"+restaurant.src} className=" cursor-pointer "
            > */}

            {/*<div className="w-[200px] h-[200px] bg-fixed" style={dishbg} >daoishdoashodhao</div>*/}
            <Link href={"restaurants/" + restaurant.restaurantID}>
            <div className="relative w-full h-40 rounded-t-xl cursor-pointer">
                <Image
                    src={"https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"}
                    layout="fill"
                    objectFit="cover"
                    priority
                    alt="..."
                    className="rounded-t-xl"
                />
            </div>
            </Link>
            <div className="px-3 py-3 drop-shadow h-40">
                <a href="#">
                    <h5 className="leading-tight text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                        {restaurant.name}
                    </h5>
                </a>
                <div className="mt-0 mb-1 flex items-center">
                    <div className="flex flex-row justify-end items-center py-3">
                           
                            <div className="flex flex-row items-center justify-center">
                                {stars.map((_, index) => {
                                    return (
                                        <FaStar
                                            key={index}
                                            size={10}
                                            color={(currentValueRatings) > index ? "#FF9F1C" : "#707070"}
                                            style={{
                                                marginRight: 5,
                                            }}
                                            />
                                        )
                                        })}
                                        
                            </div>
                            <div className="mt-0 mb-1 flex items-center">
                                
                                <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                    {!rating ? 0 : rating}
                                </span>
                            </div>
                            <span className="ml-2 text-sm ">
                                    {reviews} reviews
                            </span>
                    </div>
                </div>
                <div className="flex items-center justify-between ">
                    <Link href={"restaurants/" + restaurant.restaurantID}>
                    <a className="select-none cursor-pointer pointer rounded-lg bg-orange-peel px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#fa812f] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Visit
                    </a>
                    </Link>
                </div>
            </div>
            {/* <div>
                {console.log(Object.values(restaurant.menu))}
                {Object.values(restaurant.menu).map(restaurantsArray =>
                       <h1>{restaurantsArray.name}</h1>
                )}
            </div> */}
        </div>
    );
};

export default RestaurantCard;
