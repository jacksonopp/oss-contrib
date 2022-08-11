import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='fixed inset-0 z-10 flex items-center justify-center'>
      <div className='w-screen h-screen bg-gray-900 opacity-80 flex items-center justify-center'>
        <h1 className='text-5xl md:text-[5rem] leading-normal font-extrabold text-white'>Loading...</h1>
      </div>
    </div>
  )
}

export default Loading