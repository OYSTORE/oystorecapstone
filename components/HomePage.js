import Carousel from "./Carousel";
import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Cards from "./Cards";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import RestaurantCard from "./RestaurantCard";
import { useAuth } from "../context/AuthContext";
import React from "react";
import useFetchCarts from "../hooks/fetchCart";
import DishCards from "./DishCards";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const HomePage = ({ dishesList, restaurantsList }) => {
    const [restaurants, setRestaurants] = useState(restaurantsList);
    const [dishes, setDishes] = useState(dishesList);
    const [currentDishes, setcurrentDishes] = useState([dishes]);
    // const filterItem = (categItem) => {
    //     const updatedItems = dishes.filter((curElem) => {
    //         return curElem.main_category === categItem;
    //     });
    //     setCurrentDishes(updatedItems);
    // };
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
    {
        /*const addToCart = (uid) => {
    const cartItems = dishes.find(dish => {
      return dish.id === uid;
     })
     const updatedItems = [...cart, cartItems];
    setCart(updatedItems);
  }*/
    }
    const handleRemove = async (id) => {
        var cartItemsField = "carts." + id;
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
            [cartItemsField]: deleteField(),
        });
    };
    const { carts, loading, error, setCarts } = useFetchCarts();
    const { userInfo, currentUser } = useAuth();
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    useEffect(()=>{
        async function fetchData() {
            try {
                // const docRef = doc(db, 'users', currentUser.uid)
                // const unsub = onSnapshot(docRef, (doc) => {
                //     setCarts(doc.data().carts)
                // });
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    return;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    await setDoc(userRef, {
                        carts: {},
                        isOwner: false,
                        name: currentUser.displayName,
                        reservations: {},
                        restaurantName:"",
                        restaurantOwnerID: "",
                        reviewLists:{},
                        img: currentUser.photoURL,
                        email: currentUser.email,
                        contactNumber:0,
                      },{ merge: true });
                    
                }
                /*const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setCarts(docSnap.data().carts)
                    // setTodos('todos' in docSnap.data() ? docSnap.data().todos : {})
                } else {
                    setCarts({})
                }*/
            } catch (err) {
                setError('Failed to load data')
                console.log(err)
            }
        }
        fetchData()
    },[])
    return (
        <>
        {console.log(restaurantsList)}
            <Carousel />
            <div className="flex flex-col py-10">
                <h1 className="text-2xl sm:text-3xl font-bold pl-8 pb-3">
                    Featured Dishes
                </h1>
                <div className="relative">
                    <div
                        ref={ref}
                        className="no-scrollbar scroll-smooth snap-x flex border-t-2 mb-3 mx-8 max-h-96 max-w-full gap-6 overflow-x-auto py-2"
                    >
                        <button className="bg-white border rounded-full absolute bottom-[50%] left-2 z-10 cursor-pointer hover:bg-gray-200">
                            <MdNavigateBefore
                                size="1.8em"
                                onClick={() => scroll(-500)}
                            />
                        </button>
                        <button className="bg-white border rounded-full absolute bottom-[50%] right-2 z-10 cursor-pointer hover:bg-gray-200">
                            <MdNavigateNext
                                size="1.8em"
                                onClick={() => scroll(500)}
                            />
                        </button>
                        {dishes.map((dishListings) =>
                            typeof dishListings == null
                                ? ""
                                : Object.entries(dishListings)
                                      .slice(0, 3)
                                      .map((dish, index) => (
                                          <DishCards
                                              key={index}
                                              orig={dish[1].uid}
                                              dish={dish[1]}
                                              handleAdd={handleAdd}
                                              handleRemove={handleRemove}
                                              dishID={
                                                  dish[1].name +
                                                  "-" +
                                                  dish[1].served_by
                                              }
                                              carts={carts}
                                          />
                                      ))
                        )}
                    </div>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold pl-8 py-3">
                    Featured Restaurants
                </h1>
                <div className="flex items-center justify-center flex-wrap w-full gap-6 ">
                    {/* {Object.entries(restaurants).map(restaurantsArray => 
                    restaurantsArray[1].map(restaurant => (
                        <RestaurantCard
                            key={restaurant.name}
                            restaurant={restaurant} 
                        />
                    ))
                )} */}
                    {/* {Object.entries(restaurantsList).map(restaurantsArray => 
                    restaurantsArray[1].map(restaurant => (
                        <RestaurantCard
                            key={restaurant.name}
                            restaurant={restaurant} 
                        />
                    ))
                )} */}

                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
export default HomePage;
