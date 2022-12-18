import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const AdminRequestList = ({request, requestKey, handleDelete}) => {
    return (
        <tr className={`border-2 border-gray-100 ${requestKey % 2 === 0 ? "bg-gray-50 dark:bg-slate-700" : "bg-gray-100 dark:bg-slate-800"}`}>
            <td className="p-3 text-sm font-semibold tracking-normal">{requestKey}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.ownerName}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.ownerEmail}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.ownerContact}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.name}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.emailAddress}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.contactNumber}</td>
            <td className="p-3 text-sm font-semibold tracking-normal">{request.requesterUserID}</td>
            
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
                                <a onClick={() => handleDelete(request.requestKey)}>Delete</a>
                            </li>
                           
                        </ul>
                </div>
            </td>
        </tr>
    );
};

export default AdminRequestList;
