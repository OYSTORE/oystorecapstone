import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchUserType() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)
    const [ownerStatus, setOwnerStatus] = useState(false)
    const [adminStatus, setAdminStatus] = useState(false)
    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    
                    if (docSnap.data().isOwner == true){
                        setOwnerStatus(true)
                    }
                    if (docSnap.data().isAdmin == true){
                        setAdminStatus(true)
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
                // const userRef = doc(db, 'users', currentUser.uid)
                // const unsub2 = onSnapshot(userRef, (doc) => {
                //     setUserData(doc.data())
                // });
                
            } catch (err) {
                setError('Failed to load data')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        if (currentUser) {
            fetchData()
        }
       
    }, [])

    return { isLoading, isError, ownerStatus, adminStatus}
}