import React from 'react'

const ReservationsListOwner = ({dish, dishKey, dishID, handleDelete, handleUpdate}) => {
    return (
        <tr className={`border-2 border-gray-100 ${dishKey % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}>
            <td className="p-3 text-sm font-semibold tracking wide">{dishKey+1}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.nameReservation}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.partySize}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.dateReservation}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.timeReservation}</td>
            <td className="p-3 text-sm font-semibold tracking wide">{dish.contactReservation}</td>
            <td className="p-3 text-sm font-semibold tracking wide">Pending</td>
            <td className="p-3 text-sm font-semibold tracking wide">
                {/* <button className="btn btn-ghost btn-xs" >Update</button>
                <button className="btn btn-ghost btn-xs" >Delete</button> */}
            </td>
        </tr>
    );
}

export default ReservationsListOwner