import React from 'react'
import "./home.css"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import {SkeletonTheme} from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  return (
    <>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <SkeletonTheme baseColor='#ebf3ff' highlightColor='#6b8496' >
        <Featured/>
        <h1 className='homeTitle' id="property">Browse by Property Type</h1>
        <PropertyList/>
        <h1 className='homeTitle'>Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
        </SkeletonTheme>
       </div>
      </>
  )
}

export default Home