import Head from 'next/head'
import Image from 'next/image'
import Carousel1 from '../components/Carousel'
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"; 
import Cards from '../components/Cards';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Alert, Tabs } from 'flowbite-react';
import Navbar2 from '../components/Navbar2';
import RestaurantCard from '../components/RestaurantCard';
import Login from '../components/Login';
import { useAuth } from '../context/AuthContext';
import UserDashboard from '../components/UserDashboard';



export default function Home() {
  const [currentDishes, setCurrentDishes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
      const collectionRef = collection(db, "Dishes");
      const q = query(collectionRef, orderBy("ratings", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) =>{
          setDishes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
          })))
          setCurrentDishes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
          })))
      });
      return unsubscribe;
  }, []);
  useEffect(() => {
    const collectionRef = collection(db, "Restaurants");
    const q = query(collectionRef, orderBy("ratings", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) =>{
        setRestaurants(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
        })))
    });
    return unsubscribe;
  }, []);
  
  const filterItem = (categItem) => {
    const updatedItems = dishes.filter((curElem) => {
        return curElem.main_category === categItem;
    })
    setCurrentDishes(updatedItems);
  }
  const [cart, setCart] = useState([]);
  const handleAdd = async (dish) => {
      const collectionRef3 = collection(db, "Cart");

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
      })
  }
  const addToCart = (uid) => {
    const cartItems = dishes.find(dish => {
      return dish.id === uid;
     })
     const updatedItems = [...cart, cartItems];
    setCart(updatedItems);
  }
  const {currentUser} = useAuth()
  console.log(currentUser)
  return (
    <> 
     
      <Carousel1 />
        <div className="flex flex-col py-10">
          {/* <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">Popular Dishes</h1>
          <div className="flex  items-center justify-center flex-wrap w-full">
              {popularDishes.map(dish => (<Cards key={dish.id} dish={dish} addToCart={addToCart} />) )}
          </div>*/}
         

          <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">Featured Dishes</h1>
          
          <div className = "pl-7">
            <button onClick={() => setCurrentDishes(dishes)} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            All</button>
            <button onClick={() => filterItem('Appetizers')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Appetizers</button>
            <button onClick={() => filterItem('Beverage')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Beverage</button>
            <button onClick={() => filterItem('Meat')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Meat</button>
            <button onClick={() => filterItem('Noodles')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Noodles</button>
            <button onClick={() => filterItem('Rice')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Rice</button>
            <button onClick={() => filterItem('Seafoods')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Seafoods</button>
            <button onClick={() => filterItem('Shellfish')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Shellfish</button>
            <button onClick={() => filterItem('Vegetables')} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
            Vegetables</button>
            <h1 className='text-1xl'> <b>{currentDishes.length}</b> total items.</h1>

          </div>
         
          <div className="flex  items-center justify-center border-b-2 mb-3 flex-wrap w-full">
              {currentDishes.slice(0, 20).map(dish => (<Cards key={dish.id} orig={dish.uid} dish={dish} handleAdd={handleAdd} addToCart={addToCart} text='Add'/>) )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">Featured Restaurants</h1>

          <div className="flex  items-center justify-center flex-wrap w-full">
          {restaurants.map(restaurant => (<RestaurantCard key={restaurant.id} restaurant={restaurant} />) )}
          </div>
          
          <div>{cart.map(cart => <h1>{cart.name}</h1>)}</div>
          
        </div>
        {!currentUser && <Login />}
        {currentUser && <UserDashboard />}
    </>
  )
}
export function Cart() {
   return addToCart;
}