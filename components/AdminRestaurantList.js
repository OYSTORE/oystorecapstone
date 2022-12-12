import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const AdminRestaurantList = ({restaurant, restaurantKey, handleDelete}) => {
    return (
        <tr className={`border-2 border-gray-100 ${restaurantKey % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurantKey}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurant.name}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurant.restaurantID}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurant.emailAddress}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurant.contactNumber}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurant.ratings}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{restaurant.reviews}</td>
            {/* <td className="p-3 text-sm font-semibold tracking-normal">link</td> */}
            <td className="p-3 text-sm font-semibold tracking-normal relative flex flex-row justify-center items-center">
                <div className="dropdown dropdown-left">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <BsThreeDotsVertical/>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box "
                        >
                            {/* <li>
                                <a>
                                    Update
                                </a>
                            </li> */}
                            <li>
                                <a onClick={() => handleDelete(restaurant.id)}>Delete</a>
                            </li>
                           
                        </ul>
                </div>
            </td>
        </tr>
    );
};

export default AdminRestaurantList;
