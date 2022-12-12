import React, { useState, useEffect, useRef } from 'react';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchRestaurantList() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)
    const [restaurantData, setRestaurantData] = useState({})
    const [restaurantList, setRestaurantList] = useState([])
    const [menuData, setMenuData] = useState([])
    const [reservationsData, setReservationsData] = useState([])
    const [userData, setUserData] = useState({})
    const { currentUser } = useAuth()

    useEffect(() => {
        
        async function fetchData() {
            try {
                const resList = [];
                const collectionRef = collection(db, "Restaurants");
                // const q = query(
                //     collectionRef,
                //     orderBy("ratings", "desc")
                // );
                // const querySnapshot = await getDocs(q);
                // querySnapshot.forEach((doc) => {
                //     // doc.data() is never undefined for query doc snapshots
                //     resList.push({...doc.data(), id: doc.id});
                // });
                const q = query(
                        collectionRef,
                        orderBy("ratings", "desc")
                    );
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // resList.push(doc.data().name);
                        resList.push({...doc.data(), id: doc.id});
                    });
                  });

                // const unsub = onSnapshot(collectionRef, (doc) => {
                //     resList.push({...doc.data(), id: doc.id});
                // });

                setRestaurantList(resList);
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

    return { isLoading, isError, restaurantList}
}