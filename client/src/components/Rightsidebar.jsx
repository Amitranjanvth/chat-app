import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import {ChatContext} from '../../context/ChatContext.jsx'
import { AuthContext } from '../../context/Authcontext.jsx';

const Rightsidebar = () => {

  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImage, setMsgImage] = useState([])

  useEffect(() => {
    if (messages && Array.isArray(messages)) {
      setMsgImage(messages.filter(msg => msg?.image).map(msg => msg.image));
    } else {
      setMsgImage([]);
    }
  }, [messages]);


  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll scrollbar-hide ${selectedUser ? "max-md:hidden" : ""}`}>
       <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" className='w-20 aspect-square rounded-full'/>
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
         {onlineUsers.includes(selectedUser._id) &&  <p className='w-2 h-2 rounded-full bg-green-500'></p>  }
          {selectedUser.fullName}
        </h1>
        <p className='px-5 mx-auto'>{selectedUser.bio}</p>
       </div>
       <hr className='border-[#ffffff50] my-4 '/>

      <div className='px-3 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll scrollbar-hide grid grid-col-2 gap-4 opacity-80'>
          {msgImage.map((url,index) => (
            <div key={index} onClick={() => window.open(url)} className='cursor-pointer rounded'>
                <img src={url} alt="" className='h-full rounded-md'/>
            </div>
          ))}
        </div>
      </div>

          <button onClick={() => logout()} className='absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-400 to bg-yellow-700 text-white border-none text-sm font-light py-2 px-15 rounded-full cursor-pointer hover:ease-in-out transition-all hover:bg-pink-500'>Logout</button>
    </div>
  )
}

export default Rightsidebar
