import Carousel from "./Carousel";
import {
    deleteField,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import Cards from "./Cards";
import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import RestaurantCard from "./RestaurantCard";
import { useAuth } from "../context/AuthContext";
import React from "react";
import useFetchCarts from "../hooks/fetchCart";
import DishCards from "./DishCards";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import useFetchOwnerRestaurant from "../hooks/fetchOwnerRestaurant";
import Image from "next/image";
import { v4 } from "uuid";

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
        // const newKey =
        //     Object.keys(carts).length === 0
        //         ? 1
        //         : Math.max(...Object.keys(carts)) + 1;
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
                        ...dish,
                    },
                },
            },
            { merge: true }
        );
    };

    
    const [data, setData] = useState({ownerName:"", ownerEmail:"", ownerContact:0, name:"", contactNumber:0, emailAddress:""});
    const handleRequestAddRestaurant = async(e) =>{
        e.preventDefault();
        const userRef = doc(db, "users", "0hjdPZNzgGSW73dJo17SrHkX2W93");
       
        const reserveKeyUser = v4();       
        await setDoc(
            userRef,
            {
                requests: {
                    [reserveKeyUser]: {
                        // dishID: dish.id,
                        ...data, requesterUserID:currentUser.uid, requesterEmail:currentUser.email, requesterImg:currentUser.photoURL, requestKey:reserveKeyUser,
                    },
                },
            },
            { merge: true }
        );
        setData({ownerName:"", ownerEmail:"", ownerContact:0, name:"", contactNumber:0, emailAddress:""})
        
    }
    
    const handleAddInputChange = (e) =>{
        const id = e.target.id;
        const value = e.target.value;
        setData({...data, [id]:value})
    }
    const handleRemove = async (id) => {
        var cartItemsField = "carts." + id;
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
            [cartItemsField]: deleteField(),
        });
    };
    const { carts, loading, error} = useFetchCarts();
    const { userInfo, currentUser } = useAuth();
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    useEffect(() => {
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
                    await setDoc(
                        userRef,
                        {
                            carts: {},
                            isOwner: false,
                            name: currentUser.displayName,
                            userID: currentUser.uid,
                            reservations: {},
                            restaurantName: "",
                            restaurantOwnerID: "",
                            reviewLists: {},
                            img: currentUser.photoURL,
                            email: currentUser.email,
                            contactNumber: 0,
                            dishReviewList: {},
                            reviewLists: {},
                        },
                        { merge: true }
                    );
                }
                /*const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setCarts(docSnap.data().carts)
                    // setTodos('todos' in docSnap.data() ? docSnap.data().todos : {})
                } else {
                    setCarts({})
                }*/
            } catch (err) {
                // setError('Failed to load data')
                console.log(err);
            }
        }
        fetchData();
    }, []);


    //terms and condition
    const [toggleModal, setToggleModal] = useState(false);
    
    return (
        <>
            {/* {console.log(restaurantsList)} */}
            <Carousel />
            <div className="flex flex-col py-10 px-2">
                <h1 className="text-2xl sm:text-3xl font-bold pl-8 pb-3">
                    Featured Dishes
                </h1>
                <div className="relative">
                    <div
                        ref={ref}
                        className="no-scrollbar scroll-smooth snap-x flex border-t-2 mb-3 mx-8 max-h-96 max-w-full gap-6 overflow-x-auto py-2"
                    >
                        <button className="bg-white dark:text-base-100 border rounded-full absolute bottom-[50%] left-2 z-10 cursor-pointer hover:bg-gray-200">
                            <MdNavigateBefore
                                size="1.8em"
                                onClick={() => scroll(-500)}
                            />
                        </button>
                        <button className="bg-white dark:text-base-100 border rounded-full absolute bottom-[50%] right-2 z-10 cursor-pointer hover:bg-gray-200">
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
                <h1 className="text-2xl sm:text-3xl font-bold pl-8 py-3">
                    About Oystore
                </h1>
                <div className="flex flex-col md:flex-row" >
                    <div className=" w-full md:w-3/5 flex justify-center">
                        <div className="w-11/12 flex flex-col justify-center items-center">
                            <div className="relative w-full h-40 sm:h-72 py-4">
                                <Image
                                    src="/assets/c1.png"
                                    layout="fill"
                                    objectFit="cover"
                                    alt=""
                                />
                            </div>
                            <p className="text-justify indent-8 text-lg pt-2">
                                Talabahan in Tambak, New Washington, Aklan has grown
                                in prominence as restaurants along the road near the
                                seawalls offer talaba or oysters and other foods,
                                mainly seafood. Visitors and locals alike come to
                                this two-kilometer-long area to taste and experience
                                the different cuisines made with quality
                                ingredients. The number of restaurants open for
                                business has increased as a result of this influx of
                                customers from various locations. As a result, there
                                is competition among restaurants to see which one
                                offers sufficient and excellent foodservice. This
                                has made it challenging for customers to choose what
                                to eat and which restaurant to go to. OYSTORE: an
                                online food menu discovery for Tambak, New
                                Washington, Aklan is a platform created to make it
                                simpler for users to find information about food and
                                restaurants by streamlining their search process.
                                The website offers an interactive, real-time menu
                                along with other relevant information, which helps
                                with restaurant advertising.
                            </p>
                        </div>
                    </div>
                    <div className="w-full md:w-2/5 flex justify-center">
                        <div className="flex flex-col w-11/12 h-auto justify-center items-center">
                            <h1 className="text-2xl sm:text-3xl font-bold pl-8 py-3 text-center">
                               Add your restaurant to the website 
                            </h1>
                            <div className="flex flex-col justify-center w-full shadow-md py-3 rounded-lg my-2 border">
                                <h1 className="text-xl text-center sm:text-2xl font-bold pb-5">
                                    Request Form
                                </h1>

                                <form onSubmit={handleRequestAddRestaurant} >
                                    <div className="px-3">
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="name-reservation"
                                                className="text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                Name of Owner
                                            </label>
                                            <input type="text" name="owner-name" id="ownerName" onChange={handleAddInputChange} value={data.ownerName} required 
                                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="name-reservation"
                                                className="text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                Email Address
                                            </label>
                                            <input type="email" name="owner-email" id="ownerEmail" onChange={handleAddInputChange} value={data.ownerEmail} required 
                                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="flex flex-col pb-2">
                                            <label
                                                htmlFor="contact-reservation"
                                                className="text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                Contact Number
                                            </label>
                                            <input type="number" name="owner-contact" id="ownerContact" onChange={handleAddInputChange} min="999999999" value={data.ownerContact} required 
                                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="flex flex-col pb-2">
                                            <label
                                                htmlFor="contact-reservation"
                                                className="text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                Restaurant Name
                                            </label>
                                            <input type="text" name="restaurant-name" id="name" onChange={handleAddInputChange} min="999999999" value={data.name} required 
                                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="name-reservation"
                                                className="text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                Restaurant Email Address
                                            </label>
                                            <input type="email" name="restaurant-email" id="emailAddress" onChange={handleAddInputChange} value={data.emailAddress} required 
                                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="flex flex-col pb-2">
                                            <label
                                                htmlFor="contact-reservation"
                                                className="text-lg font-medium text-gray-700 dark:text-white"
                                            >
                                                Restaurant Contact Number
                                            </label>
                                            <input type="number" name="restaurant-contact" id="contactNumber" onChange={handleAddInputChange} min="999999999" value={data.contactNumber} required 
                                                className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel dark:focus:border-blue-600 dark:focus:ring-blue-600"
                                            />
                                        </div>
                                        <div className="flex flex-row items-center justify-center pb-2 gap-2">
                                            <input type="checkbox" className="appearance-none cursor-pointer" required/>
                                            <p className="leading-tight cursor-pointer">I agreee with the <b onClick={() => setToggleModal(!toggleModal)}>Terms of Agreement</b> of the website</p>
                                        </div>
                                        <button type="submit" value="submit" className="w-full select-none cursor-pointer
                                        rounded-lg bg-orange-peel px-5 py-2.5 text-center text-sm font-medium 
                                        text-white hover:bg-[#fa812f] focus:outline-none focus:ring-4 focus:ring-blue-300
                                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ease-in-out duration-300">
                                        Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`modal-add ${
                    toggleModal
                        ? "visible opacity-100 translate-y-20"
                        : "invisible opacity-0 -translate-y-28"
                }  overflow-y-auto h-[80vh] ease-in-out duration-300 z-10 w-4/5 lg:w-2/5 bg-white dark:bg-base-100 rounded-lg fixed top-0 left-0 right-0 mx-auto`}
            >
                <div className="p-2">
                    <div className="sticky top-0 bg-white dark:bg-base-100">
                        <p
                            onClick={() => setToggleModal(false) }
                            className=" text-right cursor-pointer font-semibold"
                        >
                            Close
                        </p>
                        <h1 className="text-lg text-center font-medium text-gray-700 dark:text-white">
                                Terms of Agreement
                        </h1>
                    </div>
                    {/* <h1 className="px-3 py-2 text-lg font-semibold">Add New Dish</h1> */}
                    <div className="">
                        <div className="flex flex-col px-3">
                            
                            <p className="text-justify">
                                By submitting your restaurant information to be included on our website, you agree to the following terms and conditions:
                                <br />
                                1. You confirm that you are the owner or authorized representative of the restaurant being submitted.
                                <br />
                                2. You grant us permission to display the information you provide, including the restaurant name, address, phone number, and menu, on our website for the purpose of promoting your restaurant.
                                <br />
                                3. You acknowledge that we are not responsible for the accuracy or completeness of the information you provide. It is your responsibility to keep your restaurant information up to date.
                                <br />
                                4. You understand that we reserve the right to remove any restaurant from our website at any time for any reason.
                                <br />
                                5. You agree to indemnify and hold us and our affiliates, officers, directors, agents, and employees harmless from any claim or demand, including reasonable attorneys&apos; fees, made by any third party due to or arising out of your restaurant&apos; inclusion on our website.
                                <br />
                                6. These terms of agreement shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without giving effect to any principles of conflicts of law. You agree that any action at law or in equity arising out of or relating to these terms of agreement shall be filed only in the state or federal courts located in [state] and you hereby consent and submit to the personal jurisdiction of such courts for the purposes of litigating any such action.
                                <br />  
                                7. If any provision of these terms of agreement shall be deemed unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from these terms of agreement and shall not affect the validity and enforceability of any remaining provisions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};
export default HomePage;
