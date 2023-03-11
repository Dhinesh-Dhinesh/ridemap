import React, { useLayoutEffect } from 'react'
import NearMeIcon from '@mui/icons-material/NearMe';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import WestIcon from '@mui/icons-material/West';
import BugReportIcon from '@mui/icons-material/BugReport';

export default function Index() {


  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='mt-4 flex flex-col items-center justify-center'>
      {/* <p className='mt-8 text-white text-center text-3xl max-md:text-lg font-bold underline underline-offset-4'>HOW TO USE</p> */}
      <img className='mt-3 pointer-events-none' alt="button_functions" src={require('./assets/functions.webp')} unselectable="on" />
      <div className='max-md:w-11/12 p-1'>
        <div className='flex items-center mt-3 '>
          <p className='mr-2 border-4 rounded-full flex justify-center items-center font-bold bg-white border-lime-400 w-10 px-2 py-1'>01</p>
          <p className='text-white max-md:text-sm'><span className='font-bold'>BUS NO : </span>Displays the bus number</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex items-center mt-3 '>
          <p className='mr-2 border-4 rounded-full flex justify-center items-center font-bold bg-white border-clr3 px-2 py-1'>02</p>
          <p className='text-white max-md:text-sm'><span className='font-bold'>SPEED : </span>The vehicle's speed is displayed in green if it is between 0 and 60, yellow if it is between 60 and 80, and red if it is more than 80</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex items-center mt-3 '>
          <p className='mr-2 border-4 rounded-full flex justify-center items-center font-bold bg-white border-orange-400 px-2 py-1'>03</p>
          <p className='text-white max-md:text-sm'><span className='font-bold'>STATUS : </span>While the vehicle is stopped, it displays stopped, and when it is moving, it displays on route.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex items-center mt-3 '>
          <p className='mr-2 border-4 rounded-full flex justify-center items-center font-bold bg-white border-purple-700 px-2 py-1'>04</p>
          <p className='text-white max-md:text-sm'><span className='font-bold'>SHOW MAP : </span>It changes to bus view and just displays the specified bus.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex items-center mt-3 '>
          <p className='mr-2 border-4 rounded-full flex justify-center items-center font-bold bg-white border-yellow-400 px-2 py-1'>05</p>
          <p className='text-white max-md:text-sm'><span className='font-bold'>ETA : </span>The estimated time to reach college from the bus location, It only displays on morning.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <p className='mt-7 text-white text-center text-3xl max-md:text-lg font-bold underline underline-offset-4'>BUTTONS AND THEIR FUNCTIONS</p>
        {/* <hr className='mt-1 border-gray-700' /> */}
        {/* buttons */}
        <div className='flex flex-col  mt-7'>
          <div className='text-white font-bold text-xl'><NearMeIcon sx={{
            color: "#AEF359",
          }} />&nbsp;LOCATION</div>
          <p className='text-white mt-2'>It displays your current location when you click.</p>
          <p className='text-gray-400 text-sm mt-3'>🟡Note : It only functions if you have location enabled.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex flex-col  mt-3'>
          <div className='text-white font-bold text-xl'><ShareLocationIcon sx={{
            color: "#AEF359",
          }} />&nbsp;TRACK</div>
          <p className='text-white mt-2'>This button toggles the bus track when it is pressed (Tracking the bus marker/icon). Normally, it follows the bus.</p>
          <p className='text-gray-400 text-sm mt-3'>🟡Note : It appears only when you click the Show Map button & In the settings, you may toggle it on or off.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex flex-col  mt-3'>
          <div className='text-white font-bold text-xl'><WestIcon sx={{
            color: "#AEF359",
          }} />&nbsp;BACK</div>
          <p className='text-white mt-2'>When you press the button. It shows all buses.</p>
          <p className='text-gray-400 text-sm mt-3'>🟡Note : It appears only when you click the Show Map button.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
        <div className='flex flex-col  mt-3'>
          <div className='text-white font-bold text-xl'><BugReportIcon sx={{
            color: "#AEF359",
          }} />&nbsp;REPORT AN ISSUE</div>
          <div className='bg-themeprimary rounded-2xl font-bold text-black text-center py-1 m-4 cursor-pointer'>
            Report an issue
          </div>
          <p className='text-white mt-2'>It is used to report problems with our app or the bus tracking system (such as inaccurate tracking or occasionally broken fields in the display map interface).</p>
          <p className='text-gray-400 text-sm mt-3'>🟡Note : You can also report problems with your bus.</p>
        </div>
        <hr className='mt-4 border-gray-700' />
      </div>
      {/* this div fixes bottom nav bar */}
      <div className='mt-8'>
        &nbsp;
      </div>
    </div>
  )
}
