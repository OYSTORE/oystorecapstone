//import Footer from "./Footer"

import { useAuth } from "../context/AuthContext";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";



const Layout = (props) => {
  const {children} = props;
  const {currentUser} = useAuth();
  return (
    <div className="flex flex-col min-h-screen relative ">
      {/* {currentUser && <Navbar2 />} */}
      
      <main className="flex-1">
        { children }
        
      </main>
      
    </div>
  );
}
 
export default Layout;