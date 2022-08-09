import React from 'react'

type Props = {
  message?: string
}

const Error = (props: Props) => {
  return (
    <div className='bg-white shadow-md rounded-lg px-8 py-4 mb-4 border border-l-4 border-red-700'>
      <div className='flex items-center justify-between'>
        <div className='text-red-700 font-bold'>Error</div>
        <div className='flex items-center'>
        </div>
      </div>
      <p className='text-gray-600'>{props.message}</p>
    </div>
  )
}

export default Error