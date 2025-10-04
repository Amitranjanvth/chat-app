import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/Authcontext.jsx';

const Loginpage = () => {

  const [currState, setCurrState] = useState('Sign up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const {login} = useContext(AuthContext)

  const SubmitHandler = (e) => {
    e.preventDefault();
    if(currState === 'Sign up' && !isDataSubmitted) {
    setIsDataSubmitted(true)
    return;
    }
    login(currState === 'Sign up' ? 'signup' : 'login', {fullName,email,password,bio})
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
        {/*  ---------Left----------  */}

        <img src={assets.logo_big} alt="" className='w-[min(25vw,220px)]'/>

        {/* -------------Right ------------- */}

        <form onSubmit={SubmitHandler} className='border border-gray-600 text-white bg-white/8 p-6 rounded-lg shadow-lg flex flex-col gap-6 w-1/3'>
        <h2 className='font-medium text-2xl flex items-center justify-between text-yellow-500'>{currState}
         {isDataSubmitted &&  (<img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt=""  className='w-5 cursor-pointer'/>)}
        </h2>

        {!isDataSubmitted && currState === 'Sign up' && (  <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder='Enter FullName here ....' required className='rounded-3xl py-2 px-4 border border-gray-500 focus:outline-none' />)}
        
        {!isDataSubmitted && (
          <>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter email here ... ' required className='rounded-3xl py-2 px-4 border border-gray-500 focus:outline-none ' />

          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password here ... ' required className='rounded-3xl py-2 px-4 border border-gray-500 focus:outline-none ' />

          </>
        )}

        {currState === 'Sign up' && isDataSubmitted && (
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className='rounded-3xl py-2 px-4 border border-gray-500 focus:outline-none ' placeholder='Enter your boi section here ....'></textarea>
        )}

      {currState === 'Sign up' && !isDataSubmitted && (
          <div className='flex items-center gap-2 text-md text-white'>
          <input type="checkbox"/>
          <p>Agree to the terms of use & privacy</p>
        </div>
      )}

        <button type='submit' className='border outline-none bg-gradient-to-br from-red-400 to-yellow-600 p-2 rounded-4xl mx-7 cursor-pointer'>{currState === 'Sign up' ? 'create Account' : 'Login Now'}</button>
      
        <div className='flex flex-col gap-2'>
          {currState === 'Sign up' ? (
            <p>Already have an Account ? <span onClick={(e) => {setCurrState("Login"); setIsDataSubmitted(false)}} className='text-violet-500 font-medium cursor-pointer'>Login here</span></p>
           ) : (
             <p>Create an Account ? <span onClick={() => {setCurrState('Sign up')}} className='text-violet-500 font-medium cursor-pointer'>Signup here</span></p>
           )} 
        </div>
      
        </form>

    </div>
  )
}

export default Loginpage
