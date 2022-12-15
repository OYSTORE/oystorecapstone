import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchRestaurantRatings() {
    // const [isLoading, setLoading] = useState(true)
    // const [isError, setError] = useState(null)
    const [reviewsObj, setReviewsObj] = useState({})

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const unsub = onSnapshot(docRef, (doc) => {
                    setReviewsObj(doc.data().reviewLists)
                });
                /*const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setCarts(docSnap.data().carts)
                    // setTodos('todos' in docSnap.data() ? docSnap.data().todos : {})
                } else {
                    setCarts({})
                }*/
            } catch (err) {
                // setError('Failed to load data')
                console.log(err)
            } finally {
                // setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { isLoading, isError, reviewsObj, setReviewsObj }
}