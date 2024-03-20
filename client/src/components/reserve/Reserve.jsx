import React, { useContext } from 'react'
import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import {SearchContext} from '../../context/SearchContext'
import axios from 'axios'
const Reserve = ({setOpen,hotelId}) => {
    const {data,loading,error}=  useFetch(`https://hotel-booking-0dol.onrender.com/hotels/room/${hotelId}`)
    // console.log(data)
    const [selectedRooms, setSelectedRooms] = useState([])
  
    const handleSelect=(e)=>{
        const checked=e.target.checked
        const value=e.target.value
        setSelectedRooms(checked?[...selectedRooms,value]:selectedRooms.filter((item)=>item!==value))
    }

    const dateRange=(start,end)=>{
        const date=new Date(start.getTime())
        const dates=[]
        while (date<=end){
          dates.push(new Date(date).getTime())
          date.setDate(date.getDate()+1)
        }
        return dates
    }
    const {dates}=useContext(SearchContext)
    const allDates=dateRange(dates[0].startDate,dates[0].endDate)
    console.log(allDates)

    const isAvailable=(roomNumber)=>{
      const isFound=roomNumber.unavailableDates.some(date=>allDates.includes(new Date(date).getTime()))

      return !isFound
    }

    const handleClick=async()=>{
      
      try {
        await Promise.all(selectedRooms.map((roomId)=>{
          const res =axios.put(`/rooms/availability/${roomId}`,{dates:allDates})
          return res.data;
        }))
      } catch (err) {
        console.log(err)
      }
    }
  return  (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve