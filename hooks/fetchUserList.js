import React, { useState, useEffect, useRef } from 'react';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchUserList() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)
    const [userList, setUserList] = useState([])
    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const users = [];
                const collectionRef = collection(db, "users");
                const q = query(
                    collectionRef
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    users.push({...doc.data(), id: doc.id});
                });
                setUserList(users);
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

    return { isLoading, isError, userList}
}