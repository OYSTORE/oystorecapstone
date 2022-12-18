import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchCarts() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [carts, setCarts] = useState([])

    const { currentUser } = useAuth()

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
                    setCarts(docSnap.data().carts);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                // const unsub2 = onSnapshot(userRef, (doc) => {
                //     setCarts(doc.data().carts)
                    
                // });
                // const unsub = onSnapshot(userRef, (doc) => {
                //     setCarts(doc.data())})
                
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
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { loading, error, carts, setCarts }
}