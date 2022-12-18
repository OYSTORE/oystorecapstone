import { data } from "autoprefixer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

// const images = [
//     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2F1xtQmszKXJcaFbdBlMia%2FGallery%2F1662814463516.jpg?alt=media&token=650bc81f-8ace-46f5-b85f-8d28c4fbf622",
//     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2F1xtQmszKXJcaFbdBlMia%2FGallery%2F1662814463529.jpg?alt=media&token=10646fb3-75a3-4f19-b211-379ade575d2f",
//     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2F1xtQmszKXJcaFbdBlMia%2FGallery%2F1662814463535.jpg?alt=media&token=d0e12b1c-a1e6-413e-a096-eb223af6608b",
//     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2F1xtQmszKXJcaFbdBlMia%2FGallery%2F1662814463549.jpg?alt=media&token=5847aa14-33b9-4977-ad57-a1fec8eb7329",
//     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2F1xtQmszKXJcaFbdBlMia%2FGallery%2F1662814463562.jpg?alt=media&token=b60511a4-66d4-4e45-849e-8f397e1d8736",
//     "https://firebasestorage.googleapis.com/v0/b/capstone-ad877.appspot.com/o/restaurants%2F1xtQmszKXJcaFbdBlMia%2FAlcedo.jpgdfab2f2c-a45b-48c5-9d43-109b7fd9e8fd?alt=media&token=c8922094-8e51-4b39-bad6-bfc228ea7176",
   
// ]
const OwnerPageMasonry = ({images2}) => {
    const [imgData, setImgData] = useState({img: "", i:0})
    const handleViewImg = (img, i) => {
        setImgData({img, i})
    }
    console.log(images2)
    const imgAction = (action) => {
        let i = imgData.i;
        if(action === "next-img"){
            setImgData({img:images2[i + 1], i: i + 1})
        }
        if(action === "prev-img"){
            setImgData({img:images2[i - 1], i: i - 1})
        }
        if(!action) {
            setImgData({img:"", i: 0})
        }
    }
    const [modalOpen, setModalOpen] = useState(false)
    // useEffect(() => {
    //     if (modalOpen) {
    //         document.body.style.overflow = 'hidden'
    //     }else{
    //         document.body.style.overflow = 'unset'
    //     }
    //   }, [modalOpen])
    return (
        <>
            {/* {imgData.img && 
                <div className="w-full h-screen bg-black/75 fixed top-0 left-0 flex flex-col justify-center items-center z-10">
                    <button className="absolute top-5 right-5 font-bold text-white cursor-pointer " onClick={() => {imgAction(), setModalOpen(false)}}>X</button>
                    <div className="flex w-full h-screen justify-center items-center">
                        <MdOutlineKeyboardArrowLeft size="3rem" className="text-white cursor-pointer opacity-75 hover:opacity-100" onClick={() => imgAction("prev-img")}/>
                        <div className="relative w-[80vh] h-full">
                            <Image src={imgData.img} layout="fill" objectFit="contain" alt=""/>
                            
                        </div>
                        <MdOutlineKeyboardArrowRight size="3rem" className="text-white cursor-pointer opacity-75 hover:opacity-100" onClick={() => imgAction("next-img")}/>
                        
                    </div>
                   
                </div>

            } */}
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="1rem">
                   {images2.map((image, i) => (
                        <div key={i} className="relative w-full h-72">
                            <Image key={i} src={image} layout="fill" objectFit="cover" alt="" onClick={() => {handleViewImg(image, i); setModalOpen(true)}}/>
                        </div>
                   ))}
                </Masonry>
            </ResponsiveMasonry>
        </>
    );
};

export default OwnerPageMasonry;
