import React from 'react'
import HeroSection from '../../components/HeroSection'
import AboutUs from '../../components/AboutUs'
import AvailableBooks from '../../components/BookSection'
import Testimonails from '../../components/Testimonails'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <AvailableBooks />
      <Testimonails />
    </div>
  )
}

export default Home
