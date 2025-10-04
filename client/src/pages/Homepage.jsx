import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Rightsidebar from '../components/Rightsidebar'
import Chatcontainer from '../components/Chatcontainer'
import {ChatContext} from '../../context/ChatContext.jsx'


const Homepage = () => {

  const {selectedUser} = useContext(ChatContext)
  return (
 
      <div className='h-screen w-full border sm:px-[11%] sm:py-[1%]'>
      <div className={`backdrop-blur-xl overflow-hidden grid grid-col-1 relative rounded-2xl border-2 border-gray-600 h-[100%] 
        ${selectedUser ? 'md:grid-cols-[0.8fr_1.5fr_0.8fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'} ` }>
        <Sidebar />
        <Chatcontainer />
        <Rightsidebar />
      </div>
      </div>
  )
}

export default Homepage
