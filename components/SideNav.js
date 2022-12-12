import React, { useState } from 'react'

const SideNav = ({}) => {
   
  return (
   <>
   
    <div className='bg-coral h-full w-72 fixed top-0 left-0 z-10'>
      <button><p onClick = {() => setOpen(!isOpen)}>Open</p></button>
    </div>
   
   </>
   
  )
}

export default SideNav;