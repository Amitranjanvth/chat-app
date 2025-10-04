import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../context/Authcontext.jsx';
const Profilepage = () => {

    const {authUser,updateProfile} = useContext(AuthContext)
    
  const [selectedImage, setSelectedImage] = useState('')
  const [fullName, setFullName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio);
  const navigate = useNavigate();


  const SubmitHandler = async (e) => {
  e.preventDefault();

  if (!selectedImage) {
    await updateProfile({ fullName, bio });
    navigate('/');
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(selectedImage);

  reader.onload = async () => {
    const base64image = reader.result; // base64 string
    await updateProfile({ profilePic: base64image, fullName, bio });
    navigate('/');
  };
};



  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
          <form onSubmit={SubmitHandler} className='flex flex-col gap-5 p-10 flex-1'>
            <h3 className='text-3xl text-red-400 font-semibold text-center'>Profile Details</h3>
            <label htmlFor="avatar" className='pl-3 flex items-center gap-3 cursor-pointer'>
            <input 
            type="file" 
            id='avatar' 
            accept='.jpg, .jpeg, .png'
             hidden 
              onChange={(e) => setSelectedImage(e.target.files[0])}
             />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon } alt=""  className={`w-14 h-14 rounded-full`}/>
            Upload profile Image
            </label>

           <div className='flex flex-col m-3 gap-3'>
              <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" placeholder='Enter email here ... ' required className='rounded-3xl py-2 px-4 border border-gray-500 focus:outline-none ' />

           <textarea onChange={(e) => setBio(e.target.value)} rows={4} required className='rounded-3xl border border-gray-500 p-2 focus:outline-none ' placeholder='Enter your boi section here ....'></textarea>
           </div>

           <button type='submit' className=' border outline-none bg-gradient-to-br from-red-400 to-yellow-600 py-2 px-6 rounded-4xl mx-7 cursor-pointer'>Save</button>

          </form>

          <img src={authUser?.profilePic || assets.logo_icon} alt="" className={`max-w-32 aspect-square mx-10 rounded-full max-sm:mt-10 ${selectedImage && 'rounded-full'}`}/>
        
      </div>
    </div>
  )
}

export default Profilepage
