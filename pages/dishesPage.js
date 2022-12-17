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
import Footer from "../components/Footer";
import DishCardsNew from "../components/DishCardsNew";


export async function getServerSideProps(context) {
    const dishTransform = [];
    const dishesList = [];
    
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
        // ,where("ratings", ">=", 4.5)
    );
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // restaurantsList.push({ ...doc.data(), id: doc.id });
        dishesList.push({ ...doc.data().menu });
    });
    dishesList.map((dishListings) =>
    typeof dishListings == null
        ? ""
        : Object.entries(dishListings).map((dish, index) =>
              dishTransform.push(dish[1])
          )
     );
    const sortedDishes = dishTransform.sort((a, b) => {
        return b.ratings - a.ratings;
    });
    return {
        props: {
            dishesList: sortedDishes.slice(0, 40),
            // restaurantsList: restaurantsList,
        },
    };
}
const Dishespage = ({ dishesList }) => {
    useEffect(() => {
        !currentUser ? Router.push("/") : "";
        
        //const sortByTopRatings = [...dishList];
    },[currentUser])
    // const dishTransform = [];
    const [dishList, setDishList] = useState(dishesList);
   
    // console.log(dishesList)
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
        // setCarts({ ...carts, [uniquekey]: dish });
        await setDoc(
            userRef,
            {
                carts: {
                    [uniquekey]: {
                        // dishID: dish.id,
                        // name: dish.name,
                        // price: dish.price,
                        // main_category: dish.main_category,
                        // sub_category: dish.sub_category,
                        // src: dish.src,
                        // ratings: dish.ratings,
                        // reviews: dish.reviews,
                        // served_by: dish.served_by,
                        // unit: dish.unit,
                        // isAvailable: dish.isAvailable,
                        ...dish
                    },
                },
            },
            { merge: true }
        );
    };
   
    const { carts, loading, error, setCarts } = useFetchCarts();
    const { currentUser } = useAuth();
   
    //show number of dishes
    const [showNumber, setShowNumber] = useState(20);
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
        const updatedItems = dishesList.filter((curElem) => {
        return curElem.main_category === categItem || curElem.sub_category === categItem;
      });
      setDishList(updatedItems);
      }else{
        setDishList(dishesList);
      }
      
  };
    //Search function
    const [query, setQuery] = useState("");
    //console.log(dishTransform.filter(dish => dish.name.toLowerCase().includes(query.toLowerCase())))

    // new sort function
    const [sortby, setSortby] = useState();


    const [active, setActive] = useState(false);
    return (
        
        <>
            
            {currentUser ? 
           (<> <Navbar2 />
            <div className="flex flex-row-reverse min-h-screen">
                <div className="w-full md:w-4/5 ">
                    <div className="flex flex-wrap justify-between items-center px-2 sticky top-16 z-10 bg-white dark:bg-base-100">
                        <h1 className="pl-4">
                            We found <b>{dishList.filter(dish => dish.name.toLowerCase().includes(query)).length}</b> dishes for you
                        </h1>
                        <div className="flex flex-row gap-0 md:gap-2">
                            <div className="p-1 md:p-2">
                                <div className="flex flex-row items-center">
                                    <BiGridAlt size="1.3em" className="mr-2 dark:text-white" />
                                    <p className="pr-2 hidden sm:block">Show:</p>
                                    <select
                                        name="shownumber"
                                        id="shownumber"
                                        onChange={handleAddInputChangeShow}
                                        className="rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                    >
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="500">500</option>
                                        <option value="All">All</option>
                                    </select>
                                </div>
                            </div>
                            <div className="p-1 md:p-2">
                                <div className="flex flex-row justify-center items-center">
                                    <BiSort size="1.3em" className="mr-2 dark:text-white" />
                                    <p className="pr-2 hidden sm:block">Sort:</p>
                                    <select
                                        name="sort"
                                        id="sort"
                                        onChange={handleAddInputChangeSort}
                                        className="px-1 rounded-lg shadow-sm border-gray-300 focus:border-orange-peelfocus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
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
                        <div className="block md:hidden w-full">
                            <div className="p-2 flex-row items-center flex ">
                                <input
                                    type="text"
                                    name="searchBar"
                                    placeholder="Search..."
                                    id="dishesSearchBar"
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                />
                            </div>
                            <div className="flex flex-row mr-2 w-full shadow-md overflow-x-scroll">
                                
                                <div className="p-2 flex flex-row  gap-2">
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => {filterItem("All")}}>All</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Apetizers")}>Appetizers</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Beef")}>Beef</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Beverage")}>Beverages</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Chicken")}>Chicken</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Noodles")}>Noodles</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Oysters")}>Oysters</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Pork")}>Pork</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Rice")}>Rice</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Seafood")}>Seafood</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Shellfish")}>Shellfish</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Side Dish")}>Side Dish</button>
                                    <button className="text-sm px-1 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Vegetables")}>Vegetables</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center flex-wrap w-full gap-3">
                        {dishList
                            .filter(dish => dish.name.toLowerCase().includes(query))
                            .slice(0, showNumber)
                            .map((dishListings, index) =>
                                typeof dishListings == null ? (
                                    ""
                                ) : (
                                    <DishCardsNew
                                        key={index}
                                        dish={dishListings}
                                        handleAdd={handleAdd}
                                        handleRemove={handleRemove}
                                        dishID={
                                            dishListings.name +
                                            "-" +
                                            dishListings.served_by
                                        }
                                        carts={carts}
                                    />
                                )
                            )}
                    </div>
                </div>
                <div className="hidden md:block w-1/5">
                    <div className="m-3 mr-2 shadow-md">
                        <div className="p-2 flex-row items-center hidden md:flex">
                              <input
                                type="text"
                                name="searchBar"
                                placeholder="Search..."
                                id="dishesSearchBar"
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                             />
                            
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 absolute ml-60"
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
                            
                              
                            {/* 
                            <button className="btn btn-ghost btn-circle bg-white" type="submit" value="search">
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
                            <button
                                type="submit"
                                value="search"
                                className="select-none cursor-pointer
                                      rounded-lg bg-orange-peel p-2 my-2 text-center text-sm font-medium 
                                      text-white hover:bg-[#fa812f] focus:outline-none focus:ring-4 focus:ring-blue-300
                                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ease-in-out duration-300"
                            >
                                Search
                            </button>
                            <button className="btn btn-ghost btn-circle bg-white" type="submit" value="search">
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
                            </button> */}
                        </div>
                        <div className="p-2 ">
                          <h1 className="text-lg font-medium">Categories</h1>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("All")}>All</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Apetizers")}>Appetizers</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Beef")}>Beef</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Beverage")}>Beverages</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Noodles")}>Noodles</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Oysters")}>Oysters</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Pork")}>Pork</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Rice")}>Rice</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Seafood")}>Seafood</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Shellfish")}>Shellfish</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Side Dish")}>Side Dish</button>
                          <button className="p-2 w-full border rounded-lg my-1 hover:border-orange-peel hover:bg-orange-peel dark:hover:border-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all ease-in-out " onClick={() => filterItem("Vegetables")}>Vegetables</button>
                        </div>
                    </div>
                </div>
            </div><Footer /></>)
            : ""}
            
        </>
    );
};

export default Dishespage;
