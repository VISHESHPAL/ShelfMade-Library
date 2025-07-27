import React from 'react'
import HeroSection from '../../components/HeroSection'
import AboutUs from '../../components/AboutUs'
import AvailableBooks from '../../components/BookSection'
import Testimonails from '../../components/Testimonails'
import WhyUseApp from '../../components/WhyUseApp'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <AvailableBooks />
       <WhyUseApp/>
      <Testimonails />
      <Footer/>

    </div>
  )
}

export default Home
