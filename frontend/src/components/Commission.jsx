import React from 'react'

function Commission() {
  return (
    <div className='bg-image-opacity-glass p-6 text-[#22303d]'>
        <div className='w-full max-w-[1000px] h-[410px] flex justify-center items-center flex-col mx-auto'>
            <h1 className='text-[2.25rem] font-medium font-serif py-4 md:text-7xl text-center md:py-8 '>Commission Enquire</h1>
            <p className='font-sans font-thin text-md text-center pb-4 md:pb-8 md:text-xl'>Learn about Shaira's commission process and submit an enquiry form</p>
            <a href='/prints' className="btn glass bg-current text-[#22303d] hover:text-white">View Artworks</a>
        </div>
    </div>
  )
}

export default Commission