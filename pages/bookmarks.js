import Navbar2 from "../components/Navbar2";
const Bookmarks = () => {
    return ( 
        <>
        {currentUser ? 
           (<>
        <Navbar2 />
        <h1>Bookmarks Page</h1> </>): ""}
        </>
    );
}
 
export default Bookmarks;