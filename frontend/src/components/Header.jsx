import React from 'react'

export default function Header() {
  return (
    <div className='bg-slate-900 text-white px-3 py-4 flex justify-between'>
       <div>
         <h1 className='text-xl'>Vehicle inventory manager</h1> 
       </div>
       <div>
        <a href="contact/" className='hover:underline'>Contact app admin</a>
       </div>
        </div>
  )
}
 