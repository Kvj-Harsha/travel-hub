import React from 'react';
import Herodash from '../_components/Herodash';
import Headerdarknext from '../_components/Headerdarknxt';
import Filler1 from'../_components/Filler1';
import { UserButton } from "@clerk/nextjs";

function Home() {
  return (
    <div className="relative h-screen">
      <UserButton 
        className="absolute top-4 right-4 bg-transparent text-black border-none" 
      />
      <Headerdarknext />
      <Herodash />

    </div>
  );
}

export default Home;
