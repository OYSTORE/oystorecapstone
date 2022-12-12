
import React from "react";

const MenuTableList = ({dish, dishKey, dishID, handleDelete, handleUpdate}) => {
    return (
        <tr className={`border-2 border-gray-100 ${dishKey % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
            <td className="p-3 text-sm font-semibold tracking wide">{dishKey+1}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.name}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.price}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.main_category}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.sub_category}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.unit}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.isAvailable ? "true" : "false"}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.src}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.ratings}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.reviews}</td>
            <td className="p-3 text-sm font-semibold tracking wide">
                <button className="btn btn-ghost btn-xs" onClick={() => handleUpdate(dish, dishID)}>Update</button>
                <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(dishID)}>Delete</button>
            </td>
        </tr>
    );
};

export default MenuTableList;
