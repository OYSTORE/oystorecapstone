import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "@firebase/firestore";
import { db } from "../firebase";


const useFetch = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const collectionRef = collection(db, "dishes");
        const q = query(collectionRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) =>{
            setData(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id
            })))

        });
        return unsubscribe;

    }, []);
    return {data};
}
 
export default useFetch;