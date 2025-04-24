
import React from 'react'
import { Hero } from '../components/Hero'
import Events from '../components/Events'
import Footer from '../components/Footer'
import Timeline from '../components/Timeline'

const Home = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <Hero />
        <Events />
        <Footer/>
    </div>
  )
}

export default Home