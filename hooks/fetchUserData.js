import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function useFetchUserData() {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)
    const [ownerStatus, setOwnerStatus] = useState(false)
    const [userData, setUserData] = useState({})
    const [userReviewsData, setUserReviewsData] = useState()
    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    setUserData({ ...docSnap.data(), id: docSnap.id });
                    setUserReviewsData({ ...docSnap.data().reviewList, id: docSnap.id });
                    
                    if (docSnap.data().isOwner == true){
                        setOwnerStatus(true)
                    }else{
                        setOwnerStatus(false)
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

    return { isLoading, isError, userData, ownerStatus, userReviewsData}
}