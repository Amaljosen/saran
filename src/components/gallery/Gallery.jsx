import React from 'react'
import LandingPage from './LandingPage'
import Memories from './Memories'
import Videos from './Videos'

const Gallery = () => {
  return (
    <div className='container mx-auto mt-24 md:mt-32 text-black'>
      <LandingPage/>
      <Memories/>
      <Videos/>
    </div>
  )
}

export default Gallery