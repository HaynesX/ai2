import React from 'react'
import LoadingComponent from './Loader'

const LoaderPage = ({onNavigate}: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '80svh', flexDirection: 'column', gap: '50px' }} className=''>
  <LoadingComponent />
  <h1 className='opacity-65 mt-[7rem]'>Downloading Model...</h1>
</div>

  )
}

export default LoaderPage