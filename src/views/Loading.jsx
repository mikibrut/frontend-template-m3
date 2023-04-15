import React from 'react'
import { BounceLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='app-body'>
        <BounceLoader color="#71D0FE" />
    </div>
  )
}
