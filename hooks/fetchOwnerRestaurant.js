import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchOwnerRestaurant() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)
    const [restaurantData, setRestaurantData] = useState({})
    const [menuData, setMenuData] = useState([])
    const [reservationsData, setReservationsData] = useState([])
    const [userReservationsData, setUserReservationsData] = useState([])
    const [userReviewLists, setUserReviewLists] = useState([])
    const [userData, setUserData] = useState({})
    const [carts, setCarts] = useState([])
    const [gallery, setGallery] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    setUserData({ ...docSnap.data(), id: docSnap.id });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                // const userRef = doc(db, 'users', currentUser.uid)
                const unsub2 = onSnapshot(userRef, (doc) => {
                    setCarts(doc.data().carts)
                    setUserReservationsData(doc.data().reservations)
                    setUserReviewLists(doc.data().reviewLists)
                });
                const docRef = doc(db, 'Restaurants', docSnap.data().restaurantOwnerID)
                const unsub = onSnapshot(docRef, (doc) => {
                    setRestaurantData(doc.data());
                    setMenuData(doc.data().menu)
                    setReservationsData(doc.data().reservations)
                    setGallery(doc.data().galleryImages)
                });
                /*const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setCarts(docSnap.data().carts)
                    // setTodos('todos' in docSnap.data() ? docSnap.data().todos : {})
                } else {
                    setCarts({})
                }*/
            } catch (err) {
                setError('Failed to load data')
                // console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { isLoading, isError, restaurantData, userReservationsData, gallery, userData, menuData, reservationsData, carts, userReviewLists}
}