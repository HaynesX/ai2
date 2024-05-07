import React from 'react'
import LoadingComponent from './Loader'

const LoaderPage = ({onNavigate}: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '80svh' }} className=''>
  <LoadingComponent />
</div>

  )
}

export default LoaderPage