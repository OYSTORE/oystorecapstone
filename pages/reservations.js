import Router from "next/router";

const Reservation = () => {
    useEffect(() => {
        !currentUser ? Router.push("/") : ""
    },[])
    return ( 
        <h1>Reservation Page</h1>
    );
}
 
export default Reservation;