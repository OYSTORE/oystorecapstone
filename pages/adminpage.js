import { deleteDoc, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import MenuTableList from "../components/MenuTableList";

import { db } from "../firebase";
import useFetchOwnerRestaurant from "../hooks/fetchOwnerRestaurant";
import { GiChickenOven } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import {FaUser, FaUsers} from "react-icons/fa";
import ReservationsListOwner from "../components/ReservationsListOwner";
import useFetchRestaurantList from "../hooks/fetchRestaurantList";
import AdminRestaurantList from "../components/AdminRestaurantList";
import useFetchUserList from "../hooks/fetchUserList";
import AdminUserList from "../components/AdminUserList";
import Navbar2 from "../components/Navbar2";
import { MdGroupAdd, MdOutlineRestaurant } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io5";
import useFetchUserData from "../hooks/fetchUserData";
import useFetchRequests from "../hooks/fetchRequests";
import AdminRequestList from "../components/AdminRequestList";

const Adminpage = () => {
    useEffect(() => {
        !currentUser ? Router.push("/") : ""
    },[currentUser])
    const { currentUser } = useAuth();

    // testing protected routes
    // const [isOwnerValue, setIsOwnerValue] = useState();
    // useEffect(() => {
    //   var isOwnerValue = false;
    //   async function fetchData() {
    //       try {
    //           const userRef = doc(db, "users", currentUser.uid);
    //           const docSnap = await getDoc(userRef);
              
    //           if (docSnap.exists()) {
    //               // console.log("Document data:", docSnap.data());
    //               isOwnerValue = docSnap.data().isOwner;
    //               console.log(isOwnerValue)
    //           } else {
    //               // doc.data() will be undefined in this case
    //               console.log("No such document!");
    //           }
    //           // const userRef = doc(db, 'users', currentUser.uid)
    //           // const unsub2 = onSnapshot(userRef, (doc) => {
    //           //     setUserData(doc.data())
    //           // });
              
    //       } catch (err) {
              
    //           console.log(err)
    //       } 
    //   }
    //   fetchData()
    //   if (currentUser) {
    //     if(isOwnerValue == true){
    //       console.log("Signed in")
    //       console.log(isOwnerValue)
    //     }else if (isOwnerValue == false){
    //       Router.push("/");
    //       console.log("not Signed in")
    //     }
    //   }
    //   // } else if (currentUser == null) {
    //   //   Router.push("/loginpage");
    //   // }
    //   // else {
    //   //   Router.push("/loginpage");
    //   // }
    // }, [currentUser]);

    
    // const {
    //     restaurantData,
    //     loading,
    //     error,
    //     setRestaurantData,
    //     userData,
    //     menuData,
    //     reservationsData
    // } = useFetchOwnerRestaurant();
    const {
        loading,
        error,
        userData,
    } = useFetchUserData();
    const {restaurantList} = useFetchRestaurantList();
    const {requests} = useFetchRequests();
    const {userList} = useFetchUserList();
    console.log(restaurantList);
    console.log(requests);
    const [toggleState, setToggleState] = useState(2);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const deleteRequest = async (id) => {
        // const collectionRef3 = collection(db, "Cart");
        
        const docRef = doc(db, "users", "0hjdPZNzgGSW73dJo17SrHkX2W93");
        var dishItemField = "requests." + id;
        await updateDoc(docRef, {
            
            [dishItemField]: deleteField(),
        });
        // Router.reload(window.location.pathname)
    }

    const ref = useRef(null);
    const inputRef = useRef();
    const [toggleModal, setToggleModal] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState({name:"", emailAddress:"", contactNumber:0, restaurantID:"",});

    const handleAddInputChange = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setData({...data, [id]:value})
    }
    const handleAddInputChangeBool = (e) => {
      const id = e.target.id;
      const stringValue = e.target.value;
      if (stringValue === "true"){
        setData({...data, [id]:true})
      }else {
        setData({...data, [id]:false})
      }
    }
    // const handleAddInputChangeRadio = (e) =>{
    //   const id = e.target.id;
    //   const value = e.target.value;
    //   if (value === "true"){
    //     setData({...data, [id]:true})
    //   }else {
    //     setData({...data, [id]:false})
    //   }
    // }
    
    const handleAddNewDish = async(e) =>{
      e.preventDefault();
      const restaurantRef = doc(db, "Restaurants", data.restaurantID);
      await setDoc(
          restaurantRef,
          {
            name: data.name,
            emailAddress: data.emailAddress,
            contactNumber: data.contactNumber,
            restaurantID: data.restaurantID,
            menu:{},
            reviews:0,
            ratings:0,
            src:"/assets/dishpic/NoSrc.jpg",
            reservations:{},
            reviewLists:{},
          },
          { merge: true }
      );
      const userRef = doc(db, "users", data.restaurantID);
      await setDoc(
        userRef,{
          isOwner:true,
          restaurantOwnerID:data.restaurantID,
          restaurantName: data.name,
        },
        { merge: true }
      )
      setData({name:"", emailAddress:"", contactNumber:0, restaurantID:"",});
      setToggleModal(false);
      }

      const [toggleModalUpdate, setToggleModalUpdate] = useState(false);
      const [dataUpdate, setDataUpdate] = useState({name:"", price:0, main_category:"", unit:"", isAvailable:""});
      const handleAddInputChangeUpdate = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setDataUpdate({...dataUpdate, [id]:value})
      }
      const handleAddInputChangeBoolUpdate = (e) => {
        const id = e.target.id;
        const stringValue = e.target.value;
        if (stringValue === "true"){
          setDataUpdate({...dataUpdate, [id]:true})
        }else {
          setDataUpdate({...dataUpdate, [id]:false})
        }
      }
      const updateDishForm = async (dish, dishID) => {

            setDataUpdate({...dish, "dishID":dishID})
            setToggleModalUpdate(true)
           
        };
        const handleUpdateDish = async (e) => {
          e.preventDefault();
          var dishItemField = "menu." + dataUpdate.dishID;
          const docRef = doc(db, "Restaurants", userData.restaurantOwnerID);
          await updateDoc(docRef, {
              [dishItemField]: dataUpdate,
          });
          setToggleModalUpdate(false)
          setData({name:"", price:0, main_category:"", unit:"", isAvailable:""});
      };

      //request
      const deleteRestaurant = async (id) => {
        /* const collectionRef3 = collection(db, "Cart");
        
         const userDoc = doc(collectionRef3, id);
         await deleteDoc(userDoc);*/
       
        const docRef = doc(db, "Restaurants", id);
        await deleteDoc(docRef);
        const userRef = doc(db, "users", id);
        await setDoc(userRef,{
          isOwner:false,
          restaurantOwnerID:"",
          restaurantName:"",
        }, {merge:true})
        Router.reload(window.location.pathname)
    };
    return (
        <>
             
            {userData.isAdmin && (
                <>
                <Navbar2 />
                    <div className={`flex sm:flex-row flex-col-reverse 
                    ${toggleModal ? "blur-sm" : "blur-none"
                        } ease-in-out duration-300`}
                        ref={ref}
                    >
                         <div className="z-10 bg-white sticky bottom-0 sm:block side-tabs flex flex-col flex-wrap side-navbar w-full sm:w-72 sm:h-[90vh] border">
                            <div className="m-0 items-center flex flex-col ">
                               
                                <ul className="w-full mx-0 flex flex-row sm:flex-col justify-around">
                                    
                                    <li
                                        className={`group border-box px-6 py-3 flex flex-row justify-center sm:justify-start items-center gap-5 cursor-pointer border-b-4 sm:border-l-4 sm:border-0
                                        ${
                                            toggleState === 2
                                                ? " border-orange-peel"
                                                : "border-white"
                                        }`}
                                        onClick={() => toggleTab(2)}
                                    >
                                        <MdOutlineRestaurant
                                            size="1.8em"
                                            className={
                                                toggleState === 2   
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }
                                        />
                                        <h3
                                            className={`text-base  hidden sm:block font-medium ${
                                                toggleState === 2
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Restaurants
                                        </h3>
                                    </li>
                                    <li
                                        className={`group border-box px-6 py-3 flex flex-row  justify-center sm:justify-start items-center gap-5 cursor-pointer border-b-4 sm:border-l-4 sm:border-0
                                        ${
                                            toggleState === 3
                                                ? " border-orange-peel"
                                                : "border-white"
                                        }`}
                                        onClick={() => toggleTab(3)}
                                    >
                                        <FaUser
                                            size="1.8em"
                                            className={
                                                toggleState === 3
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }
                                        />
                                        <h3
                                            className={`text-base hidden sm:block font-medium ${
                                                toggleState === 3
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Users
                                        </h3>
                                    </li>
                                    <li
                                        className={`group border-box px-6 py-3 flex flex-row  justify-center sm:justify-start items-center gap-5 cursor-pointer border-b-4 sm:border-l-4 sm:border-0
                                        ${
                                            toggleState === 4
                                                ? " border-orange-peel"
                                                : "border-white"
                                        }`}
                                        onClick={() => toggleTab(4)}
                                    >
                                        <MdGroupAdd
                                            size="1.8em"
                                            className={
                                                toggleState === 4
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }
                                        />
                                        <h3
                                            className={`text-base hidden sm:block font-medium ${
                                                toggleState === 4
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Requests
                                        </h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                       
                        <div
                            className={`w-full ${
                                toggleState === 2 ? "block" : "hidden"
                            }`}
                        >
                            <div className="px-8 ">
                                <h1 className="text-2xl sm:text-3xl font-bold pl-5 my-5">Restaurants</h1>
                                <button
                                    onClick={() => setToggleModal(!toggleModal)}
                                    className="mt-4 p-3 bg-orange-peel rounded-lg text-white hover:bg-[#ff7c1c]"
                                >
                                    Add New Restaurant
                                </button>
                                <div>
                                    <div className="h-[28rem] overflow-auto rounded-lg shadow-md my-8">
                                        <table className="w-full h-full overflow-scroll" border="1">
                                            <thead className="bg-gray-50 border-b-3 border-gray-200">
                                                <tr className="">
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        No.
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Name
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        ID
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Email Address
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Contact Number
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Ratings
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Reviews
                                                    </th>
                                                    {/* <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Dashboard
                                                    </th> */}
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {restaurantList.map(
                                                    (restaurant, index) => (
                                                        <AdminRestaurantList
                                                            key={restaurant.restaurantID}
                                                            restaurant={restaurant}
                                                            restaurantKey={index+1}
                                                            handleDelete={
                                                                deleteRestaurant
                                                            }
                                                            handleUpdate={
                                                              updateDishForm
                                                            }
                                                        />
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`w-full ${
                                toggleState === 3 ? "block" : "hidden"
                            }`}
                        >
                            <div className="px-8 ">
                            <h1 className="text-2xl sm:text-3xl font-bold pl-5 my-5">Users</h1>
                                {/* <button
                                    onClick={() => setToggleModal(!toggleModal)}
                                    className="mt-4 p-3 bg-orange-peel rounded-lg text-white hover:bg-[#ff7c1c]"
                                >
                                    Add New Dish
                                </button> */}
                                <div>
                                    <div className="overflow-auto rounded-lg shadow-md my-8">
                                        <table className="w-full" border="1">
                                            <thead className="bg-gray-50 border-b-3 border-gray-200">
                                                <tr className="">
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        No.
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Name
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        User ID
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Ownership
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Restaurant Owned
                                                    </th>
                                                    {/* <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Action
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userList.map(
                                                    (user, index) => (
                                                        <AdminUserList
                                                            key={user.id}
                                                            user={user}
                                                            userKey={index+1}
                                                            // handleDelete={
                                                                
                                                            // }
                                                            handleUpdate={
                                                              updateDishForm
                                                            }
                                                        />
                                                    )
                                                )}
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`w-full ${
                                toggleState === 4 ? "block" : "hidden"
                            }`}
                        >
                            <div className="px-8 ">
                                <h1 className="text-2xl sm:text-3xl font-bold pl-5 my-5">Requests</h1>
                               
                                <div>
                                    <div className="h-[70vh] overflow-auto rounded-lg shadow-md my-8">
                                        <table className="w-full overflow-scroll" border="1">
                                            <thead className="bg-gray-50 border-b-3 border-gray-200">
                                                <tr className="">
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        No.
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Owner&apos;s Name
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Owner&apos;s Email Address
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Owner&apos;s Contact Number
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Restaurant&apos;s Name
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Restaurant&apos;s Email Address
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Restaurant&apos;s Contact Number
                                                    </th>
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Owner&apos;s User ID
                                                    </th>
                                                    
                                                    {/* <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        Dashboard
                                                    </th> */}
                                                    <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                        
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.values(requests).map(
                                                    (request, index) => (
                                                        <AdminRequestList
                                                            key={request.requestKey}
                                                            request={request}
                                                            requestKey={index+1}
                                                            handleDelete={
                                                                deleteRequest
                                                            }
                                                            
                                                        />
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`modal-shadow ${
                            toggleModal || toggleModalUpdate
                                ? "flex opacity-50"
                                : "invisible opacity-0"
                        } justify-center items-center  top-0 fixed left-0 right-0 mx-auto bg-black opacity-25 w-full h-screen ease-in-out duration-300`}
                    ></div>
                    
                    <div
                        className={`modal-add ${
                            toggleModal
                                ? "visible opacity-100 translate-y-32"
                                : "invisible opacity-0 -translate-y-28"
                        } ease-in-out duration-300 z-10 w-4/5 lg:w-2/5 bg-white rounded-lg  absolute top-0 left-0 right-0 mx-auto`}
                    >
                        <div className="p-2">
                            <p
                                onClick={() => setToggleModal(false) }
                                className="text-right cursor-pointer font-semibold"
                            >
                                Close
                            </p>
                            <h1 className="px-3 py-2 text-lg font-semibold">Add New Restaurant</h1>
                            <div>
                              <form onSubmit={handleAddNewDish} >
                                  <div className="px-3">
                                      <div className="flex flex-col gap-3">
                                        <label
                                            htmlFor="name"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Restaurant Name
                                        </label>
                                        <input type="text" name="restaurant-name" id="name" onChange={handleAddInputChange} value={data.name} required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
                                          <label
                                              htmlFor="emailAddress"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              Email Address
                                          </label>
                                          <input placeholder="" type="email" name="res-email" id="emailAddress" onChange={handleAddInputChange} value={data.emailAddress} required 
                                              className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                          />
                                        <label
                                            htmlFor="contactNumber"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Contact Number
                                        </label>
                                        <input placeholder="Ex: 09123456789" type="number" name="res-no" id="contactNumber" onChange={handleAddInputChange} value={data.contactNumber} min="999999999" required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
                                        
                                        <label
                                              htmlFor="restaurantID"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              User ID of Owner&apos;s Account
                                        </label>
                                        <input placeholder="" type="text" name="res-ownerID" id="restaurantID" onChange={handleAddInputChange} value={data.restaurantID} required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
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
                        className={`modal-update ${
                            toggleModalUpdate
                                ? "visible opacity-100 translate-y-32"
                                : "invisible opacity-0 -translate-y-28"
                        } ease-in-out duration-300 z-10 w-4/5 lg:w-2/5 bg-white rounded-lg  absolute top-0 left-0 right-0 mx-auto`}
                    >
                        <div className="p-2">
                            <p
                                onClick={() => setToggleModalUpdate(false) }
                                className="text-right cursor-pointer font-semibold"
                            >
                                Close
                            </p>
                            <h1 className="px-3 py-2 text-lg font-semibold">Update Dish</h1>
                            <div>
                              <form onSubmit={handleUpdateDish} >
                                  <div className="px-3">
                                      <div className="flex flex-col gap-3">
                                        <label
                                            htmlFor="name"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Dish Name
                                        </label>
                                        <input type="text" name="dish-name" id="name" onChange={handleAddInputChangeUpdate} value={dataUpdate.name} required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
                                        <label
                                            htmlFor="price"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Price (Number only)
                                        </label>
                                        <input placeholder="In Php (Just input the number only)" type="number" name="dish-price" id="price" onChange={handleAddInputChangeUpdate} value={dataUpdate.price} required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
                                        

                                          <label
                                              htmlFor="main_category"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              Category
                                          </label>
                                          <select name="dish-main-categ" id="main_category" onChange={handleAddInputChangeUpdate} value={dataUpdate.main_category} required 
                                          className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel">
                                              <option value=""></option>
                                              <option value="Apetizers">Apetizers</option>
                                              <option value="Beef">Beef</option>
                                              <option value="Beverages">Beverages</option>
                                              <option value="Chicken">Chicken</option>
                                              <option value="Noodles">Noodles</option>
                                              <option value="Oysters">Oysters</option>
                                              <option value="Pork">Pork</option>
                                              <option value="Rice">Rice</option>
                                              <option value="Seafood">Seafoods</option>
                                              <option value="Shellfish">Shellfish</option>
                                              <option value="Vegetables">Vegetables</option>
                                              
                                          </select>
                                          
                                          <label
                                              htmlFor="unit"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              Unit
                                          </label>
                                          <input placeholder="Ex: per serving, per cup, per 6 pieces, etc." type="text" name="dish-unit" id="unit" onChange={handleAddInputChangeUpdate} value={dataUpdate.unit} required 
                                              className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                          />
                                          <label
                                              htmlFor="isAvailable"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              Availability
                                          </label>
                                          <select name="dish-main-categ" id="isAvailable" onChange={handleAddInputChangeBoolUpdate} value={dataUpdate.isAvailable} required 
                                          className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel">
                                              <option value=""></option>
                                              <option value="true">Available</option>
                                              <option value="false">Currently Not Available</option>
                                             
                                          </select>
                                            {/* <h3 className="text-lg font-medium text-gray-700">Availability</h3>
                                            <div className="flex flex-row items-center">
                                            
                                            <input type="radio" id="isAvailable" name="dish-availability" value="true" onChange={handleAddInputChangeRadio} required />
                                            
                                            <label
                                                htmlFor="isAvailable"
                                                className="px-4 text-lg font-medium text-gray-700 "
                                            >
                                                Available
                                            </label>
                                           
                                            <input type="radio" id="isAvailable" name="dish-availability"  onChange={handleAddInputChangeRadio} value="false" required/>
                                            <label
                                                htmlFor="isAvailable"
                                                className="px-4 text-lg font-medium text-gray-700"
                                            >
                                                Currently Not Available
                                            </label>
                                          </div> */}
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
                </>
            )}
        </>
    );
};

export default Adminpage;
