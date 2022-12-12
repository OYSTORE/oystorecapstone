import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "@firebase/firestore";
import { MdQueryBuilder } from "react-icons/md";
import { db } from "../firebase";
import Cards from "./Cards";

const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        const collectionRef = collection(db, "Dishes");
        const q = query(collectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) =>{
            setDishes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
            })))

        });
        return unsubscribe;

    }, []);
    const filterItem = (categItem) => {
        const updatedItems = dishes.filter((curElem) => {
            return curElem.main_category === categItem;
        })
        setDishes(updatedItems);
    }
  return (
    <>
    <div className="flex flex-col py-10">
        <h1 className="text-2xl sm:text-3xl font-bold pl-5 pb-5">Featured Dishes</h1>
        
        <div className="flex  items-center justify-center flex-wrap w-full">
            {dishes.map(dish => (<Cards 
            key={dish.id} 
            name={dish.name}
            price={dish.price}
            unit={dish.unit}
            main_category={dish.main_category}
            sub_category={dish.sub_category}
            ratings={dish.ratings}
            reviews={dish.reviews}
            served_by={dish.served_by}

            />) )}
        </div>
    </div>
    </>
  )
}

export default Dishes;