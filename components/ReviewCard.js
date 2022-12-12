import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const [currentValue, setCurrentValue] = useState(review.rating);
    const stars = Array(5).fill(0);

    const handleClick = (value) => {
        setCurrentValue(value);
    };

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };
    return (
        <>
            <div>
                <div className="flex items-center w-full ">
                    <div className="w-10 rounded-full bg-orange-peel">
                        <img
                            src={review.imgSrc}
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex flex-row px-4">{review.name}</div>
                </div>
                <div className="flex flex-row items-center py-1">
                    {stars.map((_, index) => {
                        return (
                            <FaStar
                                key={index}
                                size={10}
                                // onClick={() => handleClick(index + 1)}
                                // onMouseOver={() => handleMouseOver(index + 1)}
                                // onMouseLeave={handleMouseLeave}
                                color={
                                    (currentValue) > index
                                        ? "#FF9F1C"
                                        : "#707070"
                                }
                                style={{
                                    marginRight: 10,
                                    cursor: "pointer",
                                }}
                            />
                        );
                    })}
                    <p className="text-sm">{review.datePublished}</p>
                </div>
                <p>{review.reviewText}</p>
            </div>
        </>
    );
};

export default ReviewCard;
