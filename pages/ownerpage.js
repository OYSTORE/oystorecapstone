import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import MenuTableList from "../components/MenuTableList";

import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useFetchOwnerRestaurant from "../hooks/fetchOwnerRestaurant";
import { GiChickenOven } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import { FaCalendarCheck } from "react-icons/fa";
import ReservationsListOwner from "../components/ReservationsListOwner";
import Navbar2 from "../components/Navbar2";
import useFetchUserData from "../hooks/fetchUserData";
import OwnerPageDishCard from "../components/OwnerPageDishCard";
import { v4 } from "uuid";
import ReservationsCard from "../components/ReservationsCard";
import { AiFillPicture } from "react-icons/ai";
import Image from "next/image";
import OwnerPageMasonry from "../components/OwnerPageMasonry";

const Ownerpage = () => {
    const {ownerStatus} = useFetchUserData();
    const [status, setStatus] = useState(ownerStatus);
    const { currentUser } = useAuth();
    // const [ownerStatus, setOwnerStatus] = useState(false)
    useEffect(() => {
            !currentUser ? Router.push("/"):"";
            setTimeout(() => {
                try{
                    status ? "":setStatus(false);
                }catch(err){
                    
                }
            }, 3000);
            if (status == undefined){
                
            }else if (status != false){
                Router.push("/")
            }
                
            
        // async function fetchData() {
        //     try {
        //         const userRef = doc(db, "users", currentUser.uid);
        //         const docSnap = await getDoc(userRef);
        //         if (docSnap.exists()) {
        //             // console.log("Document data:", docSnap.data());
        //                 setOwnerStatus(true)
        //                 console.log("h1")
        //         } else {
        //             // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }

        //     } catch (err) {
        //         console.log(err)
        //     } 
        // }
        // fetchData();
        
    },[currentUser,status])
    // function Redirect(){
    //    try{
    //     if (currentUser && !status){
    //         Router.push("/")
    //     }
    //    }catch(err){
    //     console.log(err)
    //    }
    // }
    // setTimeout(Redirect(), 4000) 
    // console.log(ownerStatus)

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

    
    const {
        restaurantData,
        loading,
        error,
        setRestaurantData,
        userData,
        menuData,
        reservationsData
    } = useFetchOwnerRestaurant();
    const [toggleState, setToggleState] = useState(2);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const deleteDish = async (id) => {
        /* const collectionRef3 = collection(db, "Cart");
        
         const userDoc = doc(collectionRef3, id);
         await deleteDoc(userDoc);*/
        var dishItemField = "menu." + id;
        const docRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        await updateDoc(docRef, {
            [dishItemField]: deleteField(),
        });
    };
    const ref2 = useRef(null);
    const inputRef = useRef();
    const [toggleModal, setToggleModal] = useState(false);

    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState({name:"", price:0, main_category:"", unit:"", isAvailable:"" , });

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
      upload();
      const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
      const reserveKeyUser =
          Object.keys(menuData).length === 0
              ? 1
              : Math.max(...Object.keys(menuData)) + 1;
      await setDoc(
          restaurantRef,
          {
              menu: {
                  [reserveKeyUser]: {
                      // dishID: dish.id, userName:,
                      ...data, reviews: 0, ratings: 0, src: "NoSrc.jpg", served_by: restaurantData.name, restaurantID: userData.restaurantOwnerID, sub_category:"N/A"
                      ,reviewLists:{},
                  },
              },
          },
          { merge: true }
      );
      
      setData({name:"", price:0, main_category:"", unit:"", isAvailable:"",});
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
      //image upload
      const [dishImage, setDishImage] = useState('');
      const [dishImageRef, setDishImageRef] = useState();
      const upload = () => {
        if(dishImage == null)
            return;
        const imageref = ref(storage, `/restaurants/${userData.restaurantOwnerID}/${dishImage.name + v4()}`);
        uploadBytes(imageref, dishImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                uploadDishImgUrl(url)
            })
            
            
            alert("Image Uploaded")
        });
      }
      const uploadDishImgUrl = async(url) => {
        const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        const reserveKeyUser =
            Object.keys(menuData).length === 0
                ? 1
                : Math.max(...Object.keys(menuData)) + 1;
        await setDoc(
            restaurantRef,
            {
                menu: {
                    [reserveKeyUser]: {
                        dishImg:url,
                    },
                },
            },
            { merge: true }
        );
      }
      const handleAcceptReservation = async(res, reservationKey) => {
        const userRef = doc(db, "users", res.userID);
        const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        await setDoc(
            userRef,
            {
                reservations: {
                    [reservationKey]: {
                        reservationStatus:"Confirmed",
                    },
                },
            },
            { merge: true }
        );
        await setDoc(
            restaurantRef,
            {
                reservations: {
                    [reservationKey]: {
                        reservationStatus:"Confirmed",
                    },
                },
            },
            { merge: true }
        );
      }
      const handleDenyReservation = async (res, reservationKey) => {
        const userRef = doc(db, "users", res.userID);
        const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        await setDoc(
            userRef,
            {
                reservations: {
                    [reservationKey]: {
                        reservationStatus:"Denied",
                    },
                },
            },
            { merge: true }
        );
        await setDoc(
            restaurantRef,
            {
                reservations: {
                    [reservationKey]: {
                        reservationStatus:"Denied",
                    },
                },
            },
            { merge: true }
        );
      }

      //upload gallery
      const [galleryImageMain, setGalleryImageMain] = useState('');
     
    //   const [dishImageRefMain, setDishImageRefMain] = useState();
      const uploadMain = () => {
        if(galleryImageMain == null)
            return;
        const imageref = ref(storage, `/restaurants/${userData.restaurantOwnerID}/${galleryImageMain.name + v4()}`);
        uploadBytes(imageref, galleryImageMain).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                uploadGalleryImgUrlMain(url)
            })
            
        });
      }
      const uploadGalleryImgUrlMain = async(url) => {
        const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        
        await setDoc(
            restaurantRef,
            {
                src: url
            },
            { merge: true }
        );
      }
      //gallery image upload
      const [galleryImages, setGalleryImages] = useState([]);
      const [galleryUrls, setGalleryUrls] = useState([]);
      const handleChangeMultiUpload = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setGalleryImages((prevState => [...prevState, newImage]));
        }
      }
    //   console.log(galleryImages)
    //   console.log(galleryUrls)

      const uploadGallery = () => {
        try {
            // if(galleryImages == null)
        //     return;
        // let urls = [1];
        galleryImages.map((image) => {
            const imageref = ref(storage, `/restaurants/${userData.restaurantOwnerID}/Gallery/${image.name + v4()}`);
            // promises.push(imageref);
           
                 uploadBytes(imageref, image).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        setGalleryUrls((prevState) => [...prevState, url]);
                        
                    })
            });
            console.log(galleryUrls)
        })
        // setGalleryUrls(urls)
        // Promise.all(promises)
        // .then(() => alert("All images uploaded"))
        // .catch((err) => console.log(err));
        }catch(err){
            console.log(err);
        }finally{
            uploadGalleryImgUrl(galleryUrls)
        }
       
      }
      const uploadGalleryImgUrl = async(urls) => {
        const restaurantRef = doc(db, "Restaurants", userData.restaurantOwnerID);
        
        await setDoc(
            restaurantRef,
            {
                galleryImages: [...urls], test:"s"
            },
            { merge: true }
        );
      }
    return (
        <>
            {currentUser && ownerStatus ? 
             (<> <Navbar2 /> 
                    <div
                        className={`flex flex-col-reverse sm:flex-row ${
                            toggleModal ? "blur-sm" : "blur-none"
                        } ease-in-out duration-300`}
                        ref={ref2}
                    >
                        
                        <div className="z-10 bg-white sticky bottom-0 sm:block side-tabs flex flex-col flex-wrap side-navbar w-full sm:w-72 sm:h-[90vh] border">
                            <div className="m-0 items-center flex flex-col ">
                               
                                <ul className="w-full mx-0 flex flex-row sm:flex-col justify-around">
                                    {/* <li
                                        className={`group border-box px-6 py-3 flex flex-row items-center gap-5 cursor-pointer border-l-4
                                ${
                                    toggleState === 1
                                        ? " border-orange-peel"
                                        : "border-white"
                                }`}
                                        onClick={() => toggleTab(1)}
                                    >
                                        <RiAdminFill
                                            size="1.8em"
                                            className={
                                                toggleState === 1
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }
                                        />
                                        <h3
                                            className={`text-base invisible lg:visible font-medium ${
                                                toggleState === 1
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Dashboard
                                        </h3>
                                    </li> */}
                                    <li
                                        className={`group border-box px-6 py-3 flex flex-row justify-center sm:justify-start items-center gap-5 cursor-pointer border-b-4 sm:border-l-4 sm:border-0
                                        ${
                                            toggleState === 2
                                                ? " border-orange-peel"
                                                : "border-white"
                                        }`}
                                        onClick={() => toggleTab(2)}
                                    >
                                        <GiChickenOven
                                            size="1.8em"
                                            className={
                                                toggleState === 2
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }
                                        />
                                        <h3
                                            className={`text-base hidden sm:block font-medium ${
                                                toggleState === 2
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Menu
                                        </h3>
                                    </li>
                                    <li
                                        className={`group border-box px-6 py-3 flex flex-row justify-center sm:justify-start items-center gap-5 cursor-pointer border-b-4 sm:border-l-4 sm:border-0
                                        ${
                                            toggleState === 3
                                                ? " border-orange-peel"
                                                : "border-white"
                                        }`}
                                        onClick={() => toggleTab(3)}
                                    >
                                        <FaCalendarCheck
                                            size="1.8em"
                                            className={
                                                toggleState === 3   
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }
                                        />
                                        <h3
                                            className={`text-base  hidden sm:block font-medium ${
                                                toggleState === 3
                                                    ? "text-orange-peel"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            Reservations
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
                                        <AiFillPicture
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
                                            Gallery
                                        </h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="tab-right-section w-full">
                            <div
                                className={`w-full ${
                                    toggleState === 2 ? "block" : "hidden"
                                }`}
                            >
                                <div className="px-2 md:px-8 ">
                                    <h1 className="text-2xl sm:text-3xl font-bold pl-5 my-5">Menu</h1>
                                    <button
                                        onClick={() => setToggleModal(!toggleModal)}
                                        className="mt-4 p-3 bg-orange-peel rounded-lg text-white hover:bg-[#ff7c1c]"
                                    >
                                        Add New Dish
                                    </button>
                                    {/* <div className="Table">
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
                                                            Price
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Main Category
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Sub Category
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Unit
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Availability
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Image
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Ratings
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Reviews
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(menuData).map(
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
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                    <div className="flex items-center justify-around flex-wrap w-full mt-3 ">
                                        {Object.entries(menuData).map((dish, index) =>
                                                typeof menuData == null ? (
                                                    ""
                                                ) : (
                                                    <OwnerPageDishCard
                                                        key={dish[0]}
                                                        dish={dish[1]}
                                                        handleUpdate={updateDishForm}
                                                        handleDelete={deleteDish}
                                                        dishID={dish[0]}
                                                    />
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`w-full ${
                                    toggleState ===  3 ? "block" : "hidden"
                                }`}
                            >
                                <div className="px-1 sm:px-8 ">
                                    <h1 className="text-2xl sm:text-3xl font-bold pl-5 my-5">Reservations</h1>
                                    {/* <button
                                        onClick={() => setToggleModal(!toggleModal)}
                                        className="mt-4 p-3 bg-orange-peel rounded-lg text-white hover:bg-[#ff7c1c]"
                                    >
                                        Add New Dish
                                    </button> */}
                                    
                                    {/* <div className="reservation-table">
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
                                                            Party Size
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Date
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Time Reservation
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Contact Number
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            Status
                                                        </th>
                                                        <th className="p-3 text-sm font-semibold tracking-wide text-left ">
                                                            
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(reservationsData).map(
                                                        (dish, index) => (
                                                            <ReservationsListOwner
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
                                                    )}
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> */}
                                    <div className="flex items-center justify-around flex-wrap w-full mt-3 ">
                                        {Object.entries(reservationsData).map((reservation, index) =>
                                                typeof menuData == null ? (
                                                    ""
                                                ) : (
                                                    <ReservationsCard
                                                        key={reservation[0]}
                                                        dish={reservation[1]}
                                                        handleAcceptReservation={handleAcceptReservation}
                                                        handleDenyReservation={handleDenyReservation}
                                                        dishID={reservation[0]}
                                                    />
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`w-full ${
                                    toggleState ===  4 ? "block" : "hidden"
                                }`}
                            >
                                <div className="px-1 sm:px-8 flex flex-col">
                                    <h1 className="text-2xl sm:text-3xl font-bold pl-5 my-5">Gallery</h1>
                                    <div className="flex items-center justify-around flex-col w-full mt-3 ">
                                        <div className="main-image w-full px-2 flex flex-col justify-center">
                                            <h1 className="text-lg sm:text-2xl text-center p-2 font-semibold">Main Picture</h1>
                                            
                                            <div className="flex justify-center py-3 items-center gap-2">
                                                <input type="file" className="file-input file-input-bordered file-input-sm sm:file-input-md w-full max-w-xs" onChange={(e) => (setGalleryImageMain(e.target.files[0]))} />
                                                <button onClick={uploadMain} className="p-1 sm:p-3 bg-orange-peel rounded-lg text-white hover:bg-[#ff7c1c]">Upload</button>
                                            </div>
                                            <div className="relative w-full h-40 sm:h-96">
                                                <Image src={restaurantData.src ? restaurantData.src: "/assets/dishpic/NoSrc.jpg" } layout="fill" objectFit="cover" alt=""/>
                                            </div>
                                        </div>
                                        <div className="gallery-image w-full flex flex-col justify-center">
                                            <h1 className="text-lg sm:text-2xl text-center p-2 font-semibold">Gallery Pictures</h1>

                                            <div className="flex justify-center py-3 items-center gap-2">
                                                <input type="file" className="file-input file-input-bordered file-input-sm sm:file-input-md w-full max-w-xs" onChange={handleChangeMultiUpload} multiple/>
                                                <button onClick={uploadGallery} className="p-1 sm:p-3 bg-orange-peel rounded-lg text-white hover:bg-[#ff7c1c]">Upload</button>
                                            </div>

                                            <div className="w-full px-2">
                                                <OwnerPageMasonry />
                                            </div>
                                        </div>
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
                            <h1 className="px-3 py-2 text-lg font-semibold">Add New Dish</h1>
                            <div>
                              <form onSubmit={handleAddNewDish} >
                                  <div className="px-3">
                                      <div className="flex flex-col gap-3">
                                        <label
                                            htmlFor="name"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Upload Image
                                        </label>
                                        <input type="file" name="dish-img" id="dishimg" className="file-input file-input-bordered file-input-sm sm:file-input-md w-full max-w-xs" onChange={(e) => (setDishImage(e.target.files[0]))}
                                        />
                                        
                                           
                                        <label
                                            htmlFor="name"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Dish Name
                                        </label>
                                        <input type="text" name="dish-name" id="name" onChange={handleAddInputChange} value={data.name} required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
                                        <label
                                            htmlFor="price"
                                            className="text-lg font-medium text-gray-700"
                                        >
                                             Price (Number only)
                                        </label>
                                        <input placeholder="In Php (Just input the number only)" type="number" name="dish-price" id="price" onChange={handleAddInputChange} value={data.price} required 
                                            className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                        />
                                        

                                          <label
                                              htmlFor="main_category"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              Category
                                          </label>
                                          <select name="dish-main-categ" id="main_category" onChange={handleAddInputChange} value={data.main_category} required 
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
                                          <input placeholder="Ex: per serving, per cup, per 6 pieces, etc." type="text" name="dish-unit" id="unit" onChange={handleAddInputChange} value={data.unit} required 
                                              className="w-full rounded-lg shadow-sm border-gray-300 focus:border-orange-peel focus:ring-orange-peel"
                                          />
                                          <label
                                              htmlFor="isAvailable"
                                              className="text-lg font-medium text-gray-700"
                                          >
                                              Availability
                                          </label>
                                          <select name="dish-main-categ" id="isAvailable" onChange={handleAddInputChangeBool} value={data.isAvailable} required 
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
                    </div></>)
                   : ""}
        </>
    );
};

export default Ownerpage;
