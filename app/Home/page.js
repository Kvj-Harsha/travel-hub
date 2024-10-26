import React from 'react'
import Herodash from '../_components/Herodash'
import Headerdarknext from '../_components/Headerdarknxt'
import { UserButton } from "@clerk/nextjs";

function Home() {
  return (
    <div>
        <UserButton/>
        <Headerdarknext/>
        <Herodash/>
    </div>
  )
}

export default Home