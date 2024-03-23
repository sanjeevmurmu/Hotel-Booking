import React from 'react'
import './profile.css'

const Profile = () => {
  return (
    <div className='profile'>
      <div className='profileEssential'>
        <div className='profile-image'><img src="" alt="" /></div>
        <div><p className='name'>Name</p>
        <p className='email'>Email</p>
        </div>
      </div>
      <div className='profileHistory'>
        <div className='transactionsHistory'></div>
        <div className='favourites'></div>
        <div className='reviews'></div>
      </div>
      <div className='offers'></div>
    </div>
  )
}

export default Profile