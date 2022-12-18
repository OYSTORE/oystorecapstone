import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const AdminUserList = ({user, userKey}) => {
    return (
        <tr className={`border-2 border-gray-100 ${userKey % 2 === 0 ? "bg-gray-50 dark:bg-slate-700" : "bg-gray-100 dark:bg-slate-800"}`}>
            <td className="p-3 text-sm font-semibold tracking-wide">{userKey}</td>
            <td className="p-3 text-sm font-semibold tracking-wide">{user.name}</td>
            <td className="p-3 text-sm font-semibold tracking-wide">{user.id}</td>
            <td className="p-3 text-sm font-semibold tracking-wide">{user.isOwner ? "True" : "False"}</td>
            <td className="p-3 text-sm font-semibold tracking-wide">{user.restaurantName ? user.restaurantName : "N/A"}</td>
            {/* <td className="p-3 text-sm font-semibold tracking-wide flex flex-row justify-center items-center">
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
                            <li>
                                <a>
                                    Update
                                </a>
                            </li>
                            <li>
                                <a>Delete</a>
                            </li>
                           
                        </ul>
                </div>
            </td> */}
        </tr>
    );
};

export default AdminUserList;
