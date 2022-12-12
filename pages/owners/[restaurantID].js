import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DishCards from "../../components/DishCards";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import useFetchCarts from "../../hooks/fetchCart";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import moment from "moment/moment";
import useFetchReservations from "../../hooks/fetchReservations";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
    const restaurantsList = [];
    const collectionRef = collection(db, "Restaurants");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        restaurantsList.push({ id: doc.id });
    });

    const paths = restaurantsList.map((restaurant) => ({ id: restaurant.id }));

    // const restaurants = [
    //     {
    //         id: "0Ld8w5BRRWxixapW0b2k",
    //         name: "riverside1",
    //         reviews: 4,
    //         ratings: 10,
    //     },
    //     {
    //         id: "1xtQmszKXJcaFbdBlMia",
    //         name: "riverside2",
    //         reviews: 5,
    //         ratings: 11,
    //     },
    //     {
    //         id: "MG54jONnZ2qeYyBNwbn4",
    //         name: "riverside3",
    //         reviews: 6,
    //         ratings: 12,
    //     },
    // ];
    // const paths = restaurants.map((post) => ({ id: post.id.toString() }));
    return {
        paths: paths.map((path) => ({
            params: { restaurantID: path.id.toString() },
        })),
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const id = context.params.restaurantID;
    const restaurant = [];
    const docRef = doc(db, "Restaurants", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        restaurant.push({ ...docSnap.data(), id: docSnap.id });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    return {
        props: {
            restaurant: restaurant[0],
        },
    };
}

const OwnerPage = ({ restaurant }) => {
    
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
    const handleRemove = async (id) => {
        var cartItemsField = "carts." + id;
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
            [cartItemsField]: deleteField(),
        });
    };
    const { userInfo, currentUser } = useAuth();

    const { carts, loading, error, setCarts } = useFetchCarts();

    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    
    const date = new Date();
    const currentDate = moment(date).format('YYYY-MM-DD');

    const [data, setData] = useState({});
    const {reservations, isLoading, isError, setReservations} = useFetchReservations();
    const handleAddReservation = async(e) =>{
        e.preventDefault();
        const userRef = doc(db, "users", currentUser.uid);
        const restaurantRef = doc(db, "Restaurants", restaurant.id);
        const reserveKeyUser =
            Object.keys(reservations).length === 0
                ? 1
                : Math.max(...Object.keys(reservations)) + 1;
        // const reserveKeyRestaurant =
        //     Object.keys(reservations).length === 0
        //         ? 1
        //         : Math.max(...Object.keys(reservations)) + 1;       
        await setDoc(
            userRef,
            {
                reservations: {
                    [reserveKeyUser]: {
                        // dishID: dish.id,
                        ...data, reservationTo: restaurant.name, reservationStatus:"Pending"
                    },
                },
            },
            { merge: true }
        );
        await setDoc(
            restaurantRef,
            {
                reservations: {
                    [1]: {
                        // dishID: dish.id, userName:,
                        ...data, reservationTo: restaurant.name, reservationStatus:"Pending"
                    },
                },
            },
            { merge: true }
        );
        
    }
    const handleAddInputChange = (e) =>{
        const id = e.target.id;
        const value = e.target.value;
        setData({...data, [id]:value})
    }
    
    return (
        <>{currentUser ? 
            (<> <Navbar2 />
            <div className="flex flex-col">
                <label htmlFor="my-modal-0" className="cursor-pointer">
                    <div className="relative w-full  h-56 sm:h-[30rem]">
                        <Image
                            src={"/assets/restaurants/" + restaurant.src}
                            layout="fill"
                            objectFit="cover"
                            priority
                            alt="..."
                            className="object-center"
                        />
                    </div>
                </label>

                <input
                    type="checkbox"
                    id="my-modal-0"
                    className="modal-toggle"
                />
                <div className="modal">
                    <div className="modal-box relative">
                        <label
                            htmlFor="my-modal-0"
                            className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
                        >
                            ✕
                        </label>
                        <div className="relative w-full h-56 sm:h-96">
                            <Image
                                src={"/assets/restaurants/" + restaurant.src}
                                layout="fill"
                                objectFit="contain"
                                priority
                                alt="..."
                                className="object-center"
                            />
                        </div>
                        <h1 className="text-base text-center">
                            Photo of {restaurant.name}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-0 md:gap-8 px-2 lg:px-40 align-center justify-center">
                    <div className=" bg-white w-full md:w-[60%] px-4 shadow-md">
                        <div className="border-b-2 py-4 bg-white z-20">
                            <h1 className="text-2xl text-center md:text-3xl font-bold ">
                                {restaurant.name}
                            </h1>
                        </div>
                        <div className="flex flex-row justify-end py-3">
                            <div className="mt-0 mb-1 flex items-center">
                                <svg
                                    className="h-5 w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="h-5 w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="h-5 w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="h-5 w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <svg
                                    className="h-5 w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                    {restaurant.ratings}
                                </span>
                                <span className="ml-2 text-sm font-bold">
                                    {restaurant.reviews} reviews
                                </span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold ">
                            Description
                        </h1>
                        <p className="text-justify py-4 indent-8">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Fugiat sequi, aut quia consectetur tenetur
                            harum adipisci asperiores recusandae omnis ratione
                            iusto libero incidunt velit, optio repudiandae eum
                            saepe minima natus!
                        </p>
                        <div className="menu-container">
                            <h1 className="text-2xl font-bold border-b pb-3">
                                Menu
                            </h1>
                            <div className="relative">
                                <button className="bg-white border rounded-full absolute bottom-[50%] -left-2 z-10 cursor-pointer hover:bg-gray-200">
                                    <MdNavigateBefore
                                        size="1.8em"
                                        onClick={() => scroll(-500)}
                                    />
                                </button>
                                <button className="bg-white border rounded-full absolute bottom-[50%] -right-4 z-10 cursor-pointer hover:bg-gray-200">
                                    <MdNavigateNext
                                        size="1.8em"
                                        onClick={() => scroll(500)}
                                    />
                                </button>
                                <div
                                    ref={ref}
                                    id="sidescrollContainer"
                                    className="no-scrollbar snap-x flex scroll-smooth overflow-x-auto py-4 px-2 gap-4 z-0"
                                >
                                    {Object.values(restaurant.menu).map(
                                        (dish) => (
                                            <DishCards
                                                key={dish.name}
                                                dish={dish}
                                                handleAdd={handleAdd}
                                                handleRemove={handleRemove}
                                                dishID={
                                                    dish.name +
                                                    "-" +
                                                    dish.served_by
                                                }
                                                carts={carts}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="photos-container py-2">
                            <h1 className="text-2xl font-bold border-b pb-3 mb-2">
                                Photos
                            </h1>
                            <div className="gap-1 grid grid-cols-4 photos-wrapper w-full h-72">
                                <div className="photos1 relative row-span-2 col-span-2 ">
                                    <label
                                        htmlFor="my-modal-1"
                                        className="cursor-pointer"
                                    >
                                        <div  className="relative w-full h-full">
                                        <Image
                                            src={
                                                "/assets/restaurants/restaurantsGallery/" +
                                                restaurant.restaurantID +
                                                "_01.jpg"
                                            }
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                            alt="..."
                                            className="object-center rounded-sm"
                                        />
                                        </div>
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="my-modal-1"
                                        className="modal-toggle"
                                    />
                                    <div className="modal">
                                        <div className="modal-box relative">
                                            <label
                                                htmlFor="my-modal-1"
                                                className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
                                            >
                                                ✕
                                            </label>
                                            <div className="relative w-full h-56 sm:h-96">
                                                <Image
                                                    src={
                                                        "/assets/restaurants/restaurantsGallery/" +
                                                        restaurant.restaurantID +
                                                        "_01.jpg"
                                                    }
                                                    layout="fill"
                                                    objectFit="contain"
                                                    priority
                                                    alt="..."
                                                    className="object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="photos2 relative col-span-2 ">
                                    <label
                                        htmlFor="my-modal-2"
                                        className="cursor-pointer"
                                    >
                                        <div  className="relative w-full h-full">
                                        <Image
                                            src={
                                                "/assets/restaurants/restaurantsGallery/" +
                                                restaurant.restaurantID +
                                                "_02.jpg"
                                            }
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                            alt="..."
                                            className="object-center rounded-sm"
                                        />
                                        </div>
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="my-modal-2"
                                        className="modal-toggle"
                                    />
                                    <div className="modal">
                                        <div className="modal-box relative">
                                            <label
                                                htmlFor="my-modal-2"
                                                className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
                                            >
                                                ✕
                                            </label>
                                            <div className="relative w-full h-56 sm:h-96">
                                                <Image
                                                    src={
                                                        "/assets/restaurants/restaurantsGallery/" +
                                                        restaurant.restaurantID +
                                                        "_02.jpg"
                                                    }
                                                    layout="fill"
                                                    objectFit="contain"
                                                    priority
                                                    alt="..."
                                                    className="object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="photos3 relative">
                                    <label
                                        htmlFor="my-modal-3"
                                        className="cursor-pointer"
                                    >
                                        <div  className="relative w-full h-full">
                                        <Image
                                            src={
                                                "/assets/restaurants/restaurantsGallery/" +
                                                restaurant.restaurantID +
                                                "_03.jpg"
                                            }
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                            alt="..."
                                            className="object-center rounded-sm"
                                        />
                                        </div>
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="my-modal-3"
                                        className="modal-toggle"
                                    />
                                    <div className="modal">
                                        <div className="modal-box relative">
                                            <label
                                                htmlFor="my-modal-3"
                                                className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
                                            >
                                                ✕
                                            </label>
                                            <div className="relative w-full h-56 sm:h-96">
                                                <Image
                                                    src={
                                                        "/assets/restaurants/restaurantsGallery/" +
                                                        restaurant.restaurantID +
                                                        "_03.jpg"
                                                    }
                                                    layout="fill"
                                                    objectFit="contain"
                                                    priority
                                                    alt="..."
                                                    className="object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="photos4 relative">
                                    <label
                                        htmlFor="my-modal-4"
                                        className="cursor-pointer"
                                    >
                                        <div  className="relative w-full h-full">
                                        <Image
                                            src={
                                                "/assets/restaurants/restaurantsGallery/" +
                                                restaurant.restaurantID +
                                                "_04.jpg"
                                            }
                                            layout="fill"
                                            objectFit="cover"
                                            priority
                                            alt="..."
                                            className="object-center rounded-sm"
                                        />
                                        </div>
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="my-modal-4"
                                        className="modal-toggle"
                                    />
                                    <div className="modal">
                                        <div className="modal-box relative">
                                            <label
                                                htmlFor="my-modal-4"
                                                className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
                                            >
                                                ✕
                                            </label>
                                            <div className="relative w-full h-56 sm:h-96">
                                                <Image
                                                    src={
                                                        "/assets/restaurants/restaurantsGallery/" +
                                                        restaurant.restaurantID +
                                                        "_04.jpg"
                                                    }
                                                    layout="fill"
                                                    objectFit="contain"
                                                    priority
                                                    alt="..."
                                                    className="object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="reviews-container py-2">
                            <h1 className="text-2xl font-bold border-b pb-3">
                                Reviews
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-[30%] h-auto ">
                        <div className="reservation shadow-md py-3 rounded-lg my-2 border">
                            <h1 className="text-2xl text-center  sm:text-2xl font-bold pb-5">
                                Make a Reservation
                            </h1>

                            <form onSubmit={handleAddReservation} >
                                <div className="px-3">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="party-size"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                            Party Size
                                        </label>
                                        <select name="party-size" id="partySize" onChange={handleAddInputChange} required 
                                        className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel">
                                            <option value="1">1 person</option>
                                            <option value="2">2 people</option>
                                            <option value="3">3 people</option>
                                            <option value="4">4 people</option>
                                            <option value="5">5 people</option>
                                            <option value="7">7 people</option>
                                            <option value="8">8 people</option>
                                            <option value="9">9 people</option>
                                            <option value="10">10 people</option>
                                            <option value="11">11 people</option>
                                            <option value="12">12 people</option>
                                            <option value="13">13 people</option>
                                            <option value="14">14 people</option>
                                            <option value="15">15 people</option>
                                            <option value="16">16 people</option>
                                            <option value="17">17 people</option>
                                            <option value="18">18 people</option>
                                            <option value="19">19 people</option>
                                            <option value="20">20 people</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                    <label
                                        htmlFor="date-reservation"
                                        className="text-lg font-medium text-gray-700" 
                                    >
                                        Date
                                    </label>
                                    <input type="date" name="date-reservation" id="dateReservation" onChange={handleAddInputChange} min={currentDate} required 
                                        className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                    />
                                    <label
                                        htmlFor="time-reservation"
                                        className="text-lg font-medium text-gray-700"
                                    >
                                        Time
                                    </label>
                                    <select name="time-reservation" id="timeReservation" onChange={handleAddInputChange} required 
                                    className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel">
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="10:30 AM">10:30 AM</option>
                                        <option value="11:30 AM">11:30 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="12:30 PM">12:30 PM</option>
                                        <option value="1:00 PM">1:00 PM</option>
                                        <option value="1:30 PM">1:30 PM</option>
                                        <option value="2:00 PM">2:00 PM</option>
                                        <option value="2:30 PM">2:30 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="3:30 PM">3:30 PM</option>
                                        <option value="4:00 PM">4:00 PM</option>
                                        <option value="4:30 PM">4:30 PM</option>
                                        <option value="5:00 PM">5:00 PM</option>
                                        <option value="5:30 PM">5:30 PM</option>
                                        <option value="6:00 PM">6:00 PM</option>
                                        <option value="6:30 PM">6:30 PM</option>
                                        <option value="7:00 PM">7:00 PM</option>
                                        <option value="7:30 PM">7:30 PM</option>
                                        <option value="8:00 PM">8:00 PM</option>
                                        <option value="8:30 PM">8:30 PM</option>
                                    </select>
                                    </div>
                                    <div className="flex flex-col">
                                    <label
                                        htmlFor="name-reservation"
                                        className="text-lg font-medium text-gray-700"
                                    >
                                        Name
                                    </label>
                                    <input type="text" name="name-reservation" id="nameReservation" onChange={handleAddInputChange} required 
                                        className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                    />
                                    </div>
                                    <div className="flex flex-col pb-2">
                                    <label
                                        htmlFor="contact-reservation"
                                        className="text-lg font-medium text-gray-700"
                                    >
                                        Contact Number
                                    </label>
                                    <input type="number" name="contact-reservation" id="contactReservation" onChange={handleAddInputChange} min="999999999" required 
                                        className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                    />
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
                        <div className="additional-info">
                            <h1 className="text-lg text-center py-4 sm:text-2xl font-bold pb-5">
                                Additional Information
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /></>)
            : ""}
        </>
    );
};

export default OwnerPage;
