import React from 'react'

function ViewWork() {
  return (
    <div className='bg-image-opacity p-6 text-[#22303d]'>
        <div className='w-full max-w-[1000px] h-[410px] flex justify-center items-center flex-col mx-auto'>
            <h1 className='text-[2.25rem] font-medium font-serif py-4 md:text-7xl text-center md:py-8 '>Collect Original Paintings</h1>
            <p className='font-sans font-thin text-md text-center pb-4 md:pb-8 md:text-xl'>Take a look at both the available and previously sold works in Shaira's studio</p>
            <a href='/prints' className="btn glass text-[#22303d] hover:text-white">View Artworks</a>
        </div>
    </div>
  )
}

export default ViewWork