import { data } from "autoprefixer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const images = [
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
    "/assets/dishpic/NoSrc.jpg",
]
const OwnerPageMasonry = () => {
    const [imgData, setImgData] = useState({img: "", i:0})
    const handleViewImg = (img, i) => {
        setImgData({img, i})
    }
    const imgAction = (action) => {
        let i = imgData.i;
        if(action === "next-img"){
            setImgData({img:images[i + 1], i: i + 1})
        }
        if(action === "prev-img"){
            setImgData({img:images[i - 1], i: i - 1})
        }
        if(!action) {
            setImgData({img:"", i: 0})
        }
    }
    const [modalOpen, setModalOpen] = useState(false)
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'unset'
        }
      }, [modalOpen])
    return (
        <>
            {imgData.img && 
                <div className="w-full h-screen bg-black/75 fixed top-0 left-0 flex flex-col justify-center items-center z-10">
                    <button className="absolute top-5 right-5 font-bold text-white cursor-pointer " onClick={() => {imgAction(), setModalOpen(false)}}>X</button>
                    <div className="flex w-full h-screen justify-center items-center">
                        <MdOutlineKeyboardArrowLeft size="3rem" className="text-white cursor-pointer opacity-75 hover:opacity-100" onClick={() => imgAction("prev-img")}/>
                        <div className="relative w-[80vh] h-full">
                            <Image src={imgData.img} layout="fill" objectFit="contain" alt=""/>
                            
                        </div>
                        <MdOutlineKeyboardArrowRight size="3rem" className="text-white cursor-pointer opacity-75 hover:opacity-100" onClick={() => imgAction("next-img")}/>
                        
                    </div>
                    {/* <p className="absolute botttom-0 text-center text-white">{imgData.i} out of {images.length}</p> */}
                </div>

            }
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="1rem">
                   {images.map((image, i) => (
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
