import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";

import { db } from "../firebase";

import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";

import HomePage from "../components/HomePage";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";
import { useEffect } from "react";
import Router  from "next/router";

export async function getServerSideProps(context) {
    const restaurantsList = [];
    const dishesList = [];
    // const collectionRef = collection(db, "Dishes");
    // const q = query(collectionRef, orderBy("ratings", "desc"));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     querySnapshot.forEach((doc) =>
    //         dishesList.push(doc.data())
    //     );
    // });

    // const collectionRef1 = collection(db, "Restaurants");
    // const q1 = query(collectionRef1, orderBy("ratings", "desc"));
    // const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
    //     querySnapshot.forEach((doc) =>
    //         restaurantsList.push({ ...doc.data(), id: doc.id })
    //     );
    // });
    const collectionRef1 = collection(db, "Restaurants");
    const q1 = query(
        collectionRef1,
        orderBy("ratings", "desc")
        ,where("ratings", ">=", 4.5)
    );
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        restaurantsList.push({ ...doc.data(), id: doc.id });
        dishesList.push({ ...doc.data().menu });
    });
    return {
        props: {
            dishesList: dishesList,
            restaurantsList: restaurantsList.slice(0,1),
        },
    };
}

export default function Home({ dishesList, restaurantsList }) {
    const { currentUser } = useAuth();
    useEffect(() => {
        if (!currentUser) {
          Router.push("/auth/login");
        } else {
          // console.log("login");
        }
      }, [currentUser]);
      useEffect(() => {
        
      }, [currentUser])
    return (
        <>
            {/* {!currentUser && <Login />} */}
            {currentUser && (<>
                <Navbar2 />
                <HomePage
                    dishesList={dishesList}
                    restaurantsList={restaurantsList}
                />
                <Footer />
                </>
            )}
            {/* {console.log(restaurantsList.map(res =>({id: res.id})))} */}
            
        </>
    );
}
export function Cart() {
    return addToCart;
}
