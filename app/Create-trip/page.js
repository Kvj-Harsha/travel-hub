import React from 'react'
import Headerdarknext2 from '../_components/Headerdarknxt2'

function CreateTrip() {
  return (
    <div>

      <Headerdarknext2/>
      <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt:px-10'> 
            <h2 className='font-bold textsixe:3xl'>Tell us your travel preferences</h2>
            <p mt-3 className='mt-3 text-grey-500 text-xl'>Just provide some basic information and our trip planner 
              will generate a itenarary based on your preference</p>
          <div className='mt-20'>
            <div>
              <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
            </div>
          </div>
      </div>

    </div>
  )
}

export default CreateTrip