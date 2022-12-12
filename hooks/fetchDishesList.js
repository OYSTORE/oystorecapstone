import React, { useState, useEffect, useRef } from 'react';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchDishesList() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)
    const [restaurantData, setRestaurantData] = useState({})
    const [dishList, setDishList] = useState([])
    const [menuData, setMenuData] = useState([])
    const [reservationsData, setReservationsData] = useState([])
    const [userData, setUserData] = useState({})
    const { currentUser } = useAuth()

    useEffect(() => {
        
        async function fetchData() {
            try {
                const dishesList = [];
                const collectionRef = collection(db, "Restaurants");
                // const q = query(
                //     collectionRef,
                //     orderBy("ratings", "desc")
                // );
                // const querySnapshot = await getDocs(q);
                // querySnapshot.forEach((doc) => {
                //     // doc.data() is never undefined for query doc snapshots
                //     dishesList.push({...doc.data(), id: doc.id});
                // });
                const q = query(
                        collectionRef,
                        orderBy("ratings", "desc")
                    );
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // dishesList.push(doc.data().name);
                        dishesList.push({...doc.data().menu, id: doc.id});
                    });
                  });

                // const unsub = onSnapshot(collectionRef, (doc) => {
                //     dishesList.push({...doc.data(), id: doc.id});
                // });

                setDishList(dishesList);
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

    return { isLoading, isError, dishList}
}