
import React from 'react'
import { Hero } from '../components/Hero'
import Events from '../components/Events'

const Home = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <Hero />
        <Events />
    </div>
  )
}

export default Home