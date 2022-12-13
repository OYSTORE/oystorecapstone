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
import DishCards from "../components/DishCards";
import BookmarkCard from "../components/BookmarkCard";
import useFetchOwnerRestaurant from "../hooks/fetchOwnerRestaurant";


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
      
    const {carts} = useFetchOwnerRestaurant();
    // const removeFromCart = async (id) => {
    //    /* const collectionRef3 = collection(db, "Cart");
       
    //     const userDoc = doc(collectionRef3, id);
    //     await deleteDoc(userDoc);*/
    //     var cartItemsField = "carts."+id;
    //     const docRef = doc(db, 'users', currentUser.uid);
    //     await updateDoc(docRef, {
    //         [cartItemsField]:deleteField()
    //     });
        
    // }
    const handleRemove = async (id) => {
        var cartItemsField = "carts." + id;
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, {
            [cartItemsField]: deleteField(),
        });
        Router
    };
    const handleAdd = async (dish) => {
        {
            /*const collectionRef3 = collection(db, "Cart");
      const docRef = await addDoc(collectionRef3, {
        dishID:dish.id,
        name:dish.name,
        price:dish.price,
        main_category:dish.main_category,
        sub_category:dish.sub_category,
        src:dish.src,
        ratings:dish.ratings,
        reviews:dish.reviews,
        served_by:dish.served_by,
        unit:dish.unit,
      });*/
        }
        const userRef = doc(db, "users", currentUser.uid);
        const newKey =
            Object.keys(carts).length === 0
                ? 1
                : Math.max(...Object.keys(carts)) + 1;
        const uniquekey = dish.name + "-" + dish.served_by;
        // setCarts({ ...carts, [uniquekey]: dish });
        await setDoc(
            userRef,
            {
                carts: {
                    [uniquekey]: {
                        // dishID: dish.id,
                        // name: dish.name,
                        // price: dish.price,
                        // main_category: dish.main_category,
                        // sub_category: dish.sub_category,
                        // src: dish.src,
                        // ratings: dish.ratings,
                        // reviews: dish.reviews,
                        // served_by: dish.served_by,
                        // unit: dish.unit,
                        // isAvailable: dish.isAvailable,
                        ...dish
                    },
                },
            },
            { merge: true }
        );
    };
    const { currentUser } = useAuth()
    //const {carts, loading, error} = useFetchCarts();
    return (
        <>
        {currentUser ? 
           (<>
            <Navbar2 />
                <div className="flex flex-col w-11/12 my-10 mx-auto min-h-screen">
                    <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">My Bookmarks</h1>
                    <div className="flex items-center justify-center mb-3 flex-wrap w-full gap-4">
                    
                    {/*cart.map(cartItem => (<CartCards key={cartItem.id} dish={cartItem} handleAdd={removeFromCart} text='Remove' />) )}
                    {/*Object.keys(carts).map((cart, i) => {
                        return (
                            <CartCards key = {i} dish={carts[cart]} handleAdd={removeFromCart} text='Remove'>
                            </CartCards>
                        )
                    })*/}
                    {Object.entries(carts).map(cartItem => (
                        <BookmarkCard key={cartItem[0]} cartID={cartItem[0]} dish={cartItem[1]} handleRemove={handleRemove}  
                        dishID={cartItem[1].name + "-" + cartItem[1].served_by}/>
                        
                        ) )}
                    </div>
                </div>
            <Footer className="sticky bottom-0" /></>): "" }
        </>
    );
}
 
export default Bookmarks;