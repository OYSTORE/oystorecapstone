import {
    collection,
    deleteField,
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
import { MdNavigateBefore, MdNavigateNext, MdOutlineDisabledByDefault } from "react-icons/md";
import moment from "moment/moment";
import useFetchReservations from "../../hooks/fetchReservations";
import Footer from "../../components/Footer";
import Navbar2 from "../../components/Navbar2";
import { FaStar } from "react-icons/fa";
import ReviewCard from "../../components/ReviewCard";
import useFetchOwnerRestaurant from "../../hooks/fetchOwnerRestaurant";
import useFetchUserData from "../../hooks/fetchUserData";
import DishCardsSmall from "../../components/dishCardsSmall";
import { v4 } from "uuid";


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
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const id = context.params.restaurantID;
    let restaurant = [];
    const docRef = doc(db, "Restaurants", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        restaurant.push({ ...docSnap.data(), id: docSnap.id });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    // const unsub = onSnapshot(docRef, (doc) => {
    //     restaurant2.push({ ...doc.data(), id: doc.id });
    // });

   
    return {
        props: {
            restaurant2: restaurant[0],
            resID: id,
        },
    };
}

const RestaurantPage = ({ restaurant2, resID}) => {
    const [restaurant, setRestaurant] = useState(restaurant2);
    // let restaurant2 = [];
    useEffect(() => {
        const docRef = doc(db, "Restaurants", resID);
        const unsub = onSnapshot(docRef, (doc) => {
        setRestaurant(doc.data());
    });
   
    },[])
 
    // const [restaurant, setRestaurantData] = useState(restaurantData[0]);
    // let restaurantData = [];
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const docRef = doc(db, 'Restaurants', resID)
    //             const unsub = onSnapshot(docRef, (doc) => {
    //                 restaurantData.push({ ...doc.data(), id: doc.id });
    //             });
    //             /*const docSnap = await getDoc(docRef)
    //             if (docSnap.exists()) {
    //                 setCarts(docSnap.data().carts)
    //                 // setTodos('todos' in docSnap.data() ? docSnap.data().todos : {})
    //             } else {
    //                 setCarts({})
    //             }*/
    //         } catch (err) {
    //             // setError('Failed to load data')
    //             // console.log(err)
    //         } finally {
    //             // setLoading(false)
    //         }
    //     }
    //     fetchData()
    // }, [])
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

    const [data, setData] = useState({partySize:"", dateReservation:"", timeReservation:"", nameReservation:"", contactReservation:0,});
    const {reservations, isLoading, isError, setReservations, reviewLists} = useFetchReservations();
    const handleAddReservation = async(e) =>{
        e.preventDefault();
        const userRef = doc(db, "users", currentUser.uid);
        const restaurantRef = doc(db, "Restaurants", resID);
        // const reserveKeyUser =
        //     Object.keys(reservations).length === 0
        //         ? 1
        //         : Math.max(...Object.keys(reservations)) + 1;
        const reserveKeyUser = v4();       
        await setDoc(
            userRef,
            {
                reservations: {
                    [reserveKeyUser]: {
                        // dishID: dish.id,
                        ...data, reservationTo: restaurant.name,  userID: currentUser.uid, userName:currentUser.displayName,
                        userProfilePic: currentUser.photoURL, restaurantID:resID, restaurantImg:restaurant.src, userEmail: currentUser.email,
                        reservationStatus:"Pending", reservationKey:reserveKeyUser, restaurantNo:restaurant.contactNumber, restaurantEmail:restaurant.emailAddress,
                    },
                },
            },
            { merge: true }
        );
        await setDoc(
            restaurantRef,
            {
                reservations: {
                    [reserveKeyUser]: {
                        // dishID: dish.id, userName:,
                        ...data, reservationTo: restaurant.name,  userID: currentUser.uid, userName:currentUser.displayName,
                        userProfilePic: currentUser.photoURL, restaurantID:resID, restaurantImg:restaurant.src, userEmail: currentUser.email,
                        reservationStatus:"Pending", reservationKey:reserveKeyUser, restaurantNo:restaurant.contactNumber, restaurantEmail:restaurant.emailAddress,
                    },
                },
            },
            { merge: true }
        );
        setData({partySize:"", dateReservation:"", timeReservation:"", nameReservation:"", contactReservation:0,})
    }
    
    const handleAddInputChange = (e) =>{
        const id = e.target.id;
        const value = e.target.value;
        setData({...data, [id]:value})
    }
    //ratings stars

    const [currentValue, setCurrentValue] = useState(1);
    const [hoverValue, setHoverValue] = useState(1);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        if (value == 0 ) {
            setCurrentValue(1)
        }else{
            setCurrentValue(value)
        }
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

    //review cards
    // console.log(restaurant.reviewLists)

    //write review modal
    const [toggleModal, setToggleModal] = useState(false);
    const [toggleModalDish, setToggleModalDish] = useState(false);
    const parentDivRef = useRef(null);
    const [reviewData, setReviewData] = useState("");

    const handleAddInputChangeReview = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setReviewData(value)
    }
   
    //write review function
   
    const {userData} = useFetchUserData();
    const handleAddReview = async(e) =>{
        e.preventDefault();
        const restaurantRef = doc(db, "Restaurants", resID);
        const reserveKeyUser =
            Object.keys(restaurant.reviewLists).length === 0
                ? 1
                : Math.max(...Object.keys(restaurant.reviewLists)) + 1;
        // const reserveKeyRestaurant =
        //     Object.keys(reservations).length === 0
        //         ? 1
        //         : Math.max(...Object.keys(reservations)) + 1;    
        await setDoc(
            restaurantRef,
            {
                reviewLists: {
                    [currentUser.uid]: {
                     reviewText:reviewData,  reviewerUserID:currentUser.uid, 
                     rating:currentValue, datePublished:"12/08/2021", 
                    }
                },
            },
            { merge: true }
        );
        
        const userRef = doc(db, "users", currentUser.uid);
        const reserveKeyUser2 =
            Object.keys(userData.reviewLists).length === 0
                ? 1
                : Math.max(...Object.keys(userData.reviewLists)) + 1;
        // const reserveKeyRestaurant =
        //     Object.keys(reservations).length === 0
        //         ? 1
        //         : Math.max(...Object.keys(reservations)) + 1;    
        await setDoc(
            userRef,
            {
                reviewLists: {
                    [resID]: {
                     reviewText:reviewData, name:currentUser.displayName, reviewerUserID:currentUser.uid, 
                     rating:currentValue, datePublished:"12/08/2021", imgSrc:currentUser.photoURL, restaurantID:resID,
                    }
                },
            },
            { merge: true }
        );
        setReviewData("");
        setCurrentValue(0);
        setToggleModal(false);
    }
    
    const [querySearch, setQuerySearch] = useState("");

    //rating average
   
        // Driver code
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

    //submit rating to dish
    const handleSubmit = async(dish, dishIDArray, dishRating) =>{
        const restaurantRef = doc(db, "Restaurants", resID);
        const reserveKeyUser =
            Object.keys(dish.reviewLists).length === 0
                ? 1
                : Math.max(...Object.keys(dish.reviewLists)) + 1;
        
        await setDoc(
            restaurantRef,
            {
                menu:{
                    [dishIDArray]:{
                        reviewLists: {
                            [currentUser.uid]: {
                            name:currentUser.displayName, reviewerUserID:currentUser.uid, 
                             rating:dishRating, datePublished:"12/08/2021", 
                            }
                        },
                    }
                }
            },
            { merge: true }
        );
        
        const userRef = doc(db, "users", currentUser.uid);
        const reserveKeyUser2 =
            Object.keys(userData.dishReviewList).length === 0
                ? 1
                : Math.max(...Object.keys(userData.dishReviewList)) + 1;
       
        await setDoc(
            userRef,
            {
                dishReviewList: {
                    [resID]: {
                        [dishIDArray]:{
                            reviewerUserID:currentUser.uid, 
                            rating:dishRating, datePublished:"12/08/2021", imgSrc:currentUser.photoURL,
                            restaurantID:resID, dishReviewed:dish, dishName: dish.name
                        }, 
                    }
                },
            },
            { merge: true }
        );
        setToggleModal(false);
    }
    return (
        <>
             {currentUser ? 
           (<> <Navbar2 />
            <div className={`flex flex-col ${
                            toggleModal || toggleModalDish ? "blur-sm" : "blur-none"
                        } ease-in-out duration-300`}
                        ref={parentDivRef} >
                <label htmlFor="my-modal-0" className="cursor-pointer">
                    <div className="relative w-full  h-56 sm:h-[30rem]">
                        <Image
                            // src={"https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"}
                            src="/assets/dishpic/NoSrc.jpg"
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
                                // src={"https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"}
                                src="/assets/dishpic/NoSrc.jpg"
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
                        
                        <div className="flex flex-row justify-end items-center py-3">
                            <div className="mt-0 mb-1 flex items-center">
                                
                                <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                                    {!rating ? 0 : rating}
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-center">
                                {stars.map((_, index) => {
                                    return (
                                        <FaStar
                                            key={index + 1}
                                            size={15}
                                            color={(rating) > index + 1 ? "#FF9F1C" : "#707070"}
                                            style={{
                                                marginRight: 10,
                                            }}
                                            />
                                        )
                                        })}
                                        
                            </div>
                            <span className="ml-2 text-sm font-bold">
                                    {reviews} reviews
                            </span>
                        </div>
                        {/* <h1 className="text-2xl font-bold ">
                            Description
                        </h1>
                        <p className="text-justify py-4 indent-8">
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Fugiat sequi, aut quia consectetur tenetur
                            harum adipisci asperiores recusandae omnis ratione
                            iusto libero incidunt velit, optio repudiandae eum
                            saepe minima natus!
                        </p> */}
                        <div className="menu-container">
                           <div className="flex flex-row justify-between items-center">
                                <h1 className="text-2xl font-bold border-b pb-3">
                                    Menu
                                </h1>
                                <h1 className="text-xl text-orange-peel cursor-pointer font-medium" onClick={() => setToggleModalDish(!toggleModal)}>
                                    View All
                                </h1>
                           </div>
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
                                            // src={"https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"}
                                            src="/assets/dishpic/NoSrc.jpg"
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
                                                    // src={
                                                    //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                                    // }
                                                    src="/assets/dishpic/NoSrc.jpg"
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
                                            // src={
                                            //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                            // }
                                            src="/assets/dishpic/NoSrc.jpg"
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
                                                    // src={
                                                    //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                                    // }
                                                    src="/assets/dishpic/NoSrc.jpg"
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
                                            // src={
                                            //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                            // }
                                            src="/assets/dishpic/NoSrc.jpg"
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
                                                    // src={
                                                    //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                                    // }
                                                    src="/assets/dishpic/NoSrc.jpg"
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
                                            // src={
                                            //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                            // }
                                            src="/assets/dishpic/NoSrc.jpg"
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
                                                    // src={
                                                    //     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2FAlcedo.JPG?alt=media&token=83ceb168-fb32-4f26-a002-8e6d2e564e53"
                                                    // }
                                                    src="/assets/dishpic/NoSrc.jpg"
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
                                Ratings and Review
                            </h1>
                            <div className="flex flex-row flex-wrap gap-16 items-center justify-center py-2">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-5xl">
                                        {!rating ? 0 : rating}
                                    </h1>
                                    <h1 className="text-lg">
                                        {reviews}
                                    </h1>
                                    <h1 className="text-md">
                                        Reviews
                                    </h1>
                                </div>
                                <div className="ratings flex flex-col gap-2">
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <h1 className="text-md">5</h1>
                                        <progress className="progress w-56" value={counts[5] == undefined ? 0 : counts[5]} max={reviews}></progress>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <h1 className="text-md">4</h1>
                                        <progress className="progress w-56" value={counts[4] == undefined ? 0 : counts[4]} max={reviews}></progress>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <h1 className="text-md">3</h1>
                                        <progress className="progress w-56" value={counts[3] == undefined ? 0 : counts[3]} max={reviews}></progress>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <h1 className="text-md">2</h1>
                                        <progress className="progress w-56" value={counts[2] == undefined ? 0 : counts[2]} max={reviews}></progress>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <h1 className="text-md">1</h1>
                                        <progress className="progress w-56" value={counts[1] == undefined ? 0 : counts[1]} max={reviews}></progress>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-4">
                                    <h1 className="text-2xl">
                                        Rate this app
                                    </h1>
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        {stars.map((_, index) => {
                                        return (
                                            <FaStar
                                            key={index}
                                            size={24}
                                            onClick={() => {handleClick(index + 1); setToggleModal(!toggleModal)}}
                                            onMouseOver={() => handleMouseOver(index + 1)}
                                            onMouseLeave={handleMouseLeave}
                                            color={(hoverValue || currentValue) > index ? "#FF9F1C" : "#707070"}
                                            style={{
                                                marginRight: 10,
                                                cursor: "pointer"
                                            }}
                                            />
                                        )
                                        })}
                                        
                                    </div>
                                    <h1 className="text-xl text-orange-peel cursor-pointer font-medium" onClick={() => setToggleModal(!toggleModal)}>
                                       Write a Review 
                                    </h1>
                                </div>
                            </div>
                            <div className="flex flex-col px-2 py-4 gap-4 ">
                                {Object.entries(restaurant.reviewLists).map(review => 
                                    <ReviewCard key={review[1].reviewerUserID} review={review[1]} />)
                                }
                            </div>
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
                                        <select name="party-size" id="partySize" onChange={handleAddInputChange} value={data.partySize} required 
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
                                    <input type="date" name="date-reservation" id="dateReservation" onChange={handleAddInputChange} min={currentDate} value={data.dateReservation} required 
                                        className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                    />
                                    <label
                                        htmlFor="time-reservation"
                                        className="text-lg font-medium text-gray-700"
                                    >
                                        Time
                                    </label>
                                    <select name="time-reservation" id="timeReservation" onChange={handleAddInputChange} value={data.timeReservation} required 
                                    className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel">
                                        <option value=""></option>
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
                                    <input type="text" name="name-reservation" id="nameReservation" onChange={handleAddInputChange} value={data.nameReservation} required 
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
                                    <input type="number" name="contact-reservation" id="contactReservation" onChange={handleAddInputChange} min="999999999" value={data.contactReservation} required 
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

                {/* {MODALLS} */}
                <div
                        className={`modal-add ${
                            toggleModal
                                ? "visible opacity-100 translate-y-32"
                                : "invisible opacity-0 -translate-y-28"
                        } ease-in-out duration-300 z-10 w-4/5 lg:w-2/5 bg-white rounded-lg fixed top-0 left-0 right-0 mx-auto`}
                    >
                        <div className="p-2">
                            <p
                                onClick={() => setToggleModal(false) }
                                className="text-right cursor-pointer font-semibold"
                            >
                                Close
                            </p>
                            {/* <h1 className="px-3 py-2 text-lg font-semibold">Add New Dish</h1> */}
                            <div>
                                <div className="flex flex-col px-3">
                                    <h1 className="text-lg font-medium text-gray-700">
                                    Rating
                                    </h1>
                                    <div className="flex flex-row items-center justify-center gap-4">
                                            {stars.map((_, index) => {
                                            return (
                                                <FaStar
                                                key={index}
                                                size={24}
                                                onClick={() => handleClick(index + 1)}
                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                onMouseLeave={handleMouseLeave}
                                                color={(hoverValue || currentValue) > index ? "#FF9F1C" : "#707070"}
                                                style={{
                                                    marginRight: 10,
                                                    cursor: "pointer"
                                                }}
                                                />
                                            )
                                            })}
                                            
                                    </div>
                                </div>
                                <form onSubmit={handleAddReview} >
                                    <div className="px-3">
                                        <div className="flex flex-col gap-3">
                                            <label
                                                htmlFor="name"
                                                className="text-lg font-medium text-gray-700"
                                            >
                                                Review
                                            </label>
                                            <textarea value={reviewData.reviewText} onChange={handleAddInputChangeReview} className="resize-none h-60 rounded-md" />
                                            
                                        </div>
                                        
                                        <button type="submit" value="submit" className="w-full select-none cursor-pointer
                                        rounded-lg bg-orange-peel p-4 my-4 text-center text-sm font-medium 
                                        text-white hover:bg-[#fa812f] focus:outline-none focus:ring-4 focus:ring-blue-300
                                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ease-in-out duration-300">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>

                <div
                        className={`overflow-scroll overflow-x-hidden  dishes-modal modal-add ${
                            toggleModalDish
                                ? "visible opacity-100 translate-y-24"
                                : "invisible opacity-0 -translate-y-28"
                        } ease-in-out duration-300 z-10 w-11/12 lg:w-3/5 h-4/5 bg-white rounded-lg fixed top-0 left-0 right-0 mx-auto`}
                    >
                        <div className="sticky top-0 flex flex-row justify-between items-center px-7 py-4 bg-white z-10">
                            <h1 className="text-lg font-medium text-gray-700">
                                    Menu
                            </h1>
                            <input
                                type="text"
                                name="searchBar"
                                placeholder="Search..."
                                id="dishesSearchBar"
                                onChange={(e) => setQuerySearch(e.target.value)}
                                className="mx-2 w-full md:w-2/5 rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                             />
                            <p
                                onClick={() => setToggleModalDish(false) }
                                className="text-right cursor-pointer font-semibold"
                            >
                                Close
                            </p>
                        </div>
                        <div className="shadow-lg">
                            {/* <h1 className="px-3 py-2 text-lg font-semibold">Add New Dish</h1> */}
                                <div className="flex flex-col px-3">
                                
                                    <div className="flex flex-col justify-center items-center py-2 ">
                                        {Object.entries(restaurant.menu).filter(res => res[1].name.toLowerCase().includes(querySearch)).map(
                                            (dish) => (
                                                <DishCardsSmall
                                                    key={dish[0]}
                                                    dish={dish[1]}
                                                    handleAdd={handleAdd}
                                                    handleRemove={handleRemove}
                                                    dishID={dish[0]}
                                                    carts={carts}
                                                    handleSubmit={handleSubmit}
                                                    dishIDArray={dish[0]}
                                                    reviewerID={currentUser.uid}
                                                />
                                            )
                                        )}
                                        {/* {Object.entries(menuData).map(
                                                    (dish, index) => (
                                                        <MenuTableList
                                                            key={dish[0]}
                                                            dish={dish[1]}
                                                            dishKey={index}
                                                            dishID={dish[0]}
                                                            handleDelete={
                                                                deleteDish
                                                            }
                                                            handleUpdate={
                                                              updateDishForm
                                                            }
                                                        />
                                                    )
                                                )} */}
                                    </div>
                                    {/* <div className="flex flex-row items-center justify-center gap-4">
                                            {stars.map((_, index) => {
                                            return (
                                                <FaStar
                                                key={index}
                                                size={24}
                                                onClick={() => handleClick(index + 1)}
                                                onMouseOver={() => handleMouseOver(index + 1)}
                                                onMouseLeave={handleMouseLeave}
                                                color={(hoverValue || currentValue) > index ? "#FF9F1C" : "#707070"}
                                                style={{
                                                    marginRight: 10,
                                                    cursor: "pointer"
                                                }}
                                                />
                                            )
                                            })}
                                            
                                    </div> */}
                                </div>
                        </div>
                </div>
            <Footer /></>)
            : ""}
        </>
    );
};

export default RestaurantPage;
