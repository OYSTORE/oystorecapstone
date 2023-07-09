import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import { BiSort, BiGridAlt } from "react-icons/bi";
import useFetchRestaurantList from "../hooks/fetchRestaurantList";
import DishCards from "../components/DishCards";
import useFetchDishesList from "../hooks/fetchDishesList";
import {
    collection,
    deleteField,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "../firebase";
import useFetchCarts from "../hooks/fetchCart";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";


export async function getServerSideProps(context) {
    const dishTransform = [];
    const restaurantList = [];
    
    // const collectionRef = collection(db, "Dishes");
    // const q = query(collectionRef, orderBy("ratings", "desc"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     querySnapshot.forEach((doc) =>
    //         dishesList.push(doc.data())
    //     );
    // });

    // const collectionRef1 = collection(db, "Restaurants");
    // const q1 = query(collectionRef1, orderBy("ratings", "desc"));
    // const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
    //     querySnapshot.forEach((doc) =>
    //         restaurantsList.push({ ...doc.data(), id: doc.id })
    //     );
    // });
    const collectionRef1 = collection(db, "Restaurants");
    const q1 = query(
        collectionRef1,
        orderBy("ratings", "desc")
        // where("ratings", ">=", 4.2)
    );
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // restaurantsList.push({ ...doc.data(), id: doc.id });
        restaurantList.push({ ...doc.data() });
    });
    return {
        props: {
            restaurantList: restaurantList,
            // restaurantsList: restaurantsList,
        },
    };
}
const Restaurantlist = ({ restaurantList }) => {
    
    // const dishTransform = [];
    const [dishList, setDishList] = useState(restaurantList);
   
    console.log(restaurantList)
    const handleRemove = async (id) => {
        var cartItemsField = "carts." + id;
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
            [cartItemsField]: deleteField(),
        });
    };

    const handleAdd = async (dish) => {
        {
            /*const collectionRef3 = collection(db, "Cart");
    const docRef = await addDoc(collectionRef3, {
      dishID:dish.id,
      name:dish.name,
      price:dish.price,
      main_category:dish.main_category,
      sub_category:dish.sub_category,
      src:dish.src,
      ratings:dish.ratings,
      reviews:dish.reviews,
      served_by:dish.served_by,
      unit:dish.unit,
    });*/
        }
        const userRef = doc(db, "users", currentUser.uid);
        const newKey =
            Object.keys(carts).length === 0
                ? 1
                : Math.max(...Object.keys(carts)) + 1;
        const uniquekey = dish.name + "-" + dish.served_by;
        setCarts({ ...carts, [uniquekey]: dish });
        await setDoc(
            userRef,
            {
                carts: {
                    [uniquekey]: {
                        // dishID: dish.id,
                        name: dish.name,
                        price: dish.price,
                        main_category: dish.main_category,
                        sub_category: dish.sub_category,
                        src: dish.src,
                        ratings: dish.ratings,
                        reviews: dish.reviews,
                        served_by: dish.served_by,
                        unit: dish.unit,
                        isAvailable: dish.isAvailable,
                    },
                },
            },
            { merge: true }
        );
    };
    const { carts, loading, error, setCarts } = useFetchCarts();
    const { currentUser } = useAuth();
    //show number of dishes
    const [showNumber, setShowNumber] = useState(100);
    const handleAddInputChangeShow = (e) => {
        // const id = e.target.id;
        const value = e.target.value;
        if (value === "All") {
            setShowNumber(parseInt(100000), 10);
        } else {
            setShowNumber(parseInt(value), 10);
        }
    };
    //sort function
    const [sortCategory, setSortCategory] = useState();
    const handleAddInputChangeSort = (e) => {
        // const id = e.target.id;
        const value = e.target.value;
        switch (value) {
            case "topRatings":
                topRatings();
                break;
            case "lowRatings":
                lowRatings();
                break;
            case "mostReviews":
                mostReviews();
                break;
            case "leastReviews":
                leastReviews();
                break;
            default:
                topRatings();
        }
        //console.log(value);
    };

    const topRatings = () => {
        const sortByTopRatings = [...dishList];
        sortByTopRatings.sort((a, b) => {
            return b.ratings - a.ratings;
        });
        setDishList(sortByTopRatings);
    };
    const lowRatings = () => {
        const sortBylowRatings = [...dishList];
        sortBylowRatings.sort((a, b) => {
            return a.ratings - b.ratings;
        });
        setDishList(sortBylowRatings);
    };
    // function lowRatings( a, b ) {
    //   if ( a.ratings < b.ratings ){
    //     return -1;
    //   }
    //   if ( a.ratings > b.ratings ){
    //     return 1;
    //   }
    //   setShowNumber(parseInt(20), 10)
    //   return 0;
    // }
    const mostReviews = () => {
        const sortBymostReviews = [...dishList];
        sortBymostReviews.sort((a, b) => {
            return b.reviews - a.reviews;
        });
        setDishList(sortBymostReviews);
    };
    const leastReviews = () => {
        const sortByleastReviews = [...dishList];
        sortByleastReviews.sort((a, b) => {
            return a.reviews - b.reviews;
        });
        setDishList(sortByleastReviews);
    };
   

    //filter
    const filterItem = (categItem) => {
      if (categItem != "All"){
        const updatedItems = restaurantList.filter((curElem) => {
        return curElem.main_category === categItem || curElem.sub_category === categItem;
      });
      setDishList(updatedItems);
      }else{
        setDishList(restaurantList);
      }
      
  };
    //Search function
    const [query, setQuery] = useState("");
    //console.log(dishTransform.filter(dish => dish.name.toLowerCase().includes(query.toLowerCase())))

    // new sort function
    const [sortby, setSortby] = useState();

    return (
        
        <>
            
            <Navbar2 />
            <div className="flex flex-row-reverse">
                <div className="w-full min-h-screen">
                    <div className="dark:bg-base-100 flex flex-wrap justify-center items-center sm:justify-between after:px-2 sticky top-16 z-10 bg-white">
                        <h1 className="pl-4">
                            We found <b>{dishList.filter(dish => dish.name.toLowerCase().includes(query)).length}</b> restaurants for you.
                        </h1>
                        <div className="flex flex-row items-center px-2">
                              <input
                                type="text"
                                name="searchBar"
                                placeholder="Search..."
                                id="dishesSearchBar"
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                             />
                            
                                {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 absolute ml-72"
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
                                </svg> */}
                           
                         </div>
                        <div className="flex flex-row gap-2">
                            <div className="p-2">
                                <div className="flex flex-row items-center">
                                    <BiGridAlt size="1.8em" className="mr-2 dark:text-white" />
                                    <p className="pr-2 hidden md:block">Show:</p>
                                    <select
                                        name="shownumber"
                                        id="shownumber"
                                        onChange={handleAddInputChangeShow}
                                        className="rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                    >
                                        <option value="All">All</option>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="p-2 ">
                                <div className="flex flex-row justify-center items-center">
                                    <BiSort size="1.8em" className="mr-2 dark:text-white" />
                                    <p className="pr-2 hidden md:block">Sort:</p>
                                    <select
                                        name="sort"
                                        id="sort"
                                        onChange={handleAddInputChangeSort}
                                        className="px-1 rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                    >
                                        <option value="topRatings">
                                            Top Rated
                                        </option>
                                        <option value="lowRatings">
                                            Low Rated
                                        </option>
                                        <option value="mostReviews">
                                            Most Reviews
                                        </option>
                                        <option value="leastReviews">
                                            Least Reviews
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center flex-wrap w-full gap-3 my-2">
                        {dishList
                            .filter(restaurant => restaurant.name.toLowerCase().includes(query))
                            .slice(0, showNumber)
                            .map((restaurant, index) =>
                                typeof restaurant == null ? (
                                    ""
                                ) : (
                                    <RestaurantCard
                                        key={restaurant.restaurantID}
                                        restaurant={restaurant}
                                        currentuser={currentUser}
                                    />
                                )
                            )}
                    </div>
                </div>
               
            </div><Footer />
            
        </>
    );
};

export default Restaurantlist;
