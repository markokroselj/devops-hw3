import React from 'react'

export default function VehicleCard({name ,type, location, location_link, onDelete}) {
  return (
    <div className='shadow-xl rounded-xl'>
        <div className='bg-emerald-700 p-3 rounded-t-xl' onDoubleClick={onDelete}><h1 className='text-2xl text-white font-bold'>{name}</h1></div>
        <div className='px-3 py-2'>
            <div>Vehicle type: {type}</div>
            <div className='flex justify-between'>
                <div>Location: {location}</div>
                <div className='text-blue-700 hover:underline'><a href={location_link} target='_blank'>View on map</a></div>
            </div>
        </div>
    </div>
  )
}
