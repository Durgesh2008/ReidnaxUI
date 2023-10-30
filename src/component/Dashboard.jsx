import React from 'react'
import Sidebar from './Sidebar'

const DashBoard =( {children}) => {
  return (
    <>
      <Sidebar/>

      <div className="p-4 sm:ml-64">
        <div className="p-4 drop-shadow-lg rounded-lg dark:border-gray-700">
          
          {children}
          
        </div>
      </div>
    </>
    
  )
}

export default DashBoard