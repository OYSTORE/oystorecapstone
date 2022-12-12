import { collection, deleteDoc, deleteField, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Cart } from ".";
import CartCards from "../components/CartCards";

import useFetchCarts from "../hooks/fetchCart";
import Navbar2 from "../components/Navbar2";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import Router from "next/router";


const Bookmarks = () => {
    useEffect(() => {
        !currentUser ? Router.push("/") : ""
    },[currentUser])
    {/*useEffect(() => {
        const collectionRef = collection(db, "Cart");
        const q = query(collectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) =>{
            setCart(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
            })))
        });
        return unsubscribe;
    
      }, []);*/}
      
    const {carts, loading, error, setCarts} = useFetchCarts();
    const removeFromCart = async (id) => {
       /* const collectionRef3 = collection(db, "Cart");
       
        const userDoc = doc(collectionRef3, id);
        await deleteDoc(userDoc);*/
        var cartItemsField = "carts."+id;
        const docRef = doc(db, 'users', currentUser.uid);
        await updateDoc(docRef, {
            [cartItemsField]:deleteField()
        });
        
    }
    const { currentUser } = useAuth()
    //const {carts, loading, error} = useFetchCarts();
    return (
        <>
        {currentUser ? 
           (<>
            <Navbar2 />
            <div className="flex flex-col py-10">
                <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">My Bookmarks</h1>
                <div className="flex  items-center justify-center border-b-2 mb-3 flex-wrap w-full">
                
                {/*cart.map(cartItem => (<CartCards key={cartItem.id} dish={cartItem} handleAdd={removeFromCart} text='Remove' />) )}
                {/*Object.keys(carts).map((cart, i) => {
                    return (
                        <CartCards key = {i} dish={carts[cart]} handleAdd={removeFromCart} text='Remove'>
                        </CartCards>
                    )
                })*/}
               {Object.entries(carts).map(cartItem => (<CartCards key={cartItem[0]} cartID= {cartItem[0]} dish={cartItem[1]} handleAdd={removeFromCart} text='Remove' />) )}
                </div>
            </div>
            <Footer /></>): "" }
        </>
    );
}
 
export default Bookmarks;